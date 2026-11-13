import { createHmac } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";
import { handleDeploymentHook } from "../src/lib/deployment-hook.ts";

const secret = "test-only-secret-".repeat(4);
const endpoint = "http://deployment.test/manual";
const payload = { repository: { full_name: "edwardsong08/contact-edsong" }, ref: "refs/heads/main" };

function signed(data: unknown = payload, event = "push", signingSecret = secret) {
  const body = JSON.stringify(data);
  return new Request("https://contact.test/api/deploy", {
    method: "POST",
    headers: { "x-github-event": event, "x-hub-signature-256": `sha256=${createHmac("sha256", signingSecret).update(body).digest("hex")}` },
    body,
  });
}

test("forwards only authenticated main-branch pushes with the raw signature and body", async () => {
  let count = 0;
  const forward = (async (url, init) => {
    count++;
    assert.equal(url, endpoint);
    assert.equal(init?.body?.toString(), JSON.stringify(payload));
    assert.equal(new Headers(init?.headers).get("x-github-event"), "push");
    assert.match(new Headers(init?.headers).get("x-hub-signature-256") || "", /^sha256=[a-f0-9]{64}$/);
    return new Response("ok");
  }) as typeof fetch;
  assert.equal((await handleDeploymentHook(signed(), { secret, endpoint, forward })).status, 202);
  assert.equal(count, 1);
});

test("rejects missing config, unsigned requests, bad signatures, and wrong repositories without forwarding", async () => {
  const forward = (async () => { throw new Error("Must not forward"); }) as typeof fetch;
  assert.equal((await handleDeploymentHook(signed(), { endpoint, forward })).status, 503);
  assert.equal((await handleDeploymentHook(new Request("https://contact.test", { method: "POST", body: "{}" }), { secret, endpoint, forward })).status, 401);
  assert.equal((await handleDeploymentHook(signed(payload, "push", "wrong-secret"), { secret, endpoint, forward })).status, 401);
  assert.equal((await handleDeploymentHook(signed({ ...payload, repository: { full_name: "someone/else" } }), { secret, endpoint, forward })).status, 403);
});

test("handles ping locally and ignores non-main branches", async () => {
  const forward = (async () => { throw new Error("Must not forward"); }) as typeof fetch;
  assert.equal((await handleDeploymentHook(signed(payload, "ping"), { secret, endpoint, forward })).status, 200);
  const ignored = await handleDeploymentHook(signed({ ...payload, ref: "refs/heads/development" }), { secret, endpoint, forward });
  assert.equal(ignored.status, 202);
  assert.deepEqual(await ignored.json(), { status: "ignored" });
});

test("fails visibly when the deployment service fails", async () => {
  const forward = (async () => new Response("unavailable", { status: 500 })) as typeof fetch;
  assert.equal((await handleDeploymentHook(signed(), { secret, endpoint, forward })).status, 502);
});

test("bounds payload size even without a content-length header", async () => {
  const oversized = signed({ ...payload, extra: "x".repeat(2 * 1024 * 1024) });
  assert.equal((await handleDeploymentHook(oversized, { secret, endpoint })).status, 413);
});
