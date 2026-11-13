import { createHmac, timingSafeEqual } from "node:crypto";

export async function handleDeploymentHook(
  request: Request,
  options: { secret?: string; endpoint?: string; forward?: typeof fetch },
): Promise<Response> {
  if (!options.secret || options.secret.length < 32 || !options.endpoint) {
    return Response.json({ error: "Webhook not configured" }, { status: 503 });
  }
  const signature = request.headers.get("x-hub-signature-256") || "";
  if (!/^sha256=[a-f0-9]{64}$/.test(signature)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }
  const maximum = 2 * 1024 * 1024;
  if (Number(request.headers.get("content-length")) > maximum) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }
  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  if (reader) {
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > maximum) {
        await reader.cancel();
        return Response.json({ error: "Payload too large" }, { status: 413 });
      }
      chunks.push(chunk.value);
    }
  }
  const body = Buffer.concat(chunks);
  const expected = createHmac("sha256", options.secret).update(body).digest();
  if (!timingSafeEqual(expected, Buffer.from(signature.slice(7), "hex"))) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }
  let payload: { repository?: { full_name?: string }; ref?: string };
  try {
    payload = JSON.parse(body.toString("utf8"));
    if (!payload || typeof payload !== "object") throw new Error("Invalid payload");
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (payload.repository?.full_name !== "edwardsong08/contact-edsong") {
    return Response.json({ error: "Repository not allowed" }, { status: 403 });
  }
  const event = request.headers.get("x-github-event");
  if (event === "ping") return Response.json({ status: "ok" });
  if (event !== "push" || payload.ref !== "refs/heads/main") {
    return Response.json({ status: "ignored" }, { status: 202 });
  }
  try {
    const response = await (options.forward || fetch)(options.endpoint, {
      method: "POST",
      redirect: "error",
      headers: {
        "content-type": "application/json",
        "x-github-event": "push",
        "x-github-delivery": request.headers.get("x-github-delivery") || "",
        "x-hub-signature-256": signature,
      },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return Response.json({ error: "Deployment service unavailable" }, { status: 502 });
    return Response.json({ status: "accepted" }, { status: 202 });
  } catch {
    return Response.json({ error: "Deployment service unavailable" }, { status: 502 });
  }
}
