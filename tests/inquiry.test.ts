import assert from "node:assert/strict";
import test from "node:test";
import { buildInquiry, CONTACT_EMAIL } from "../src/lib/inquiry.ts";

test("email and Gmail drafts preserve special characters and project details", () => {
  const draft = buildInquiry({ name: " Alex & Lee ", company: "https://example.com/?a=1&b=2", project: "Platform / custom build", budget: "$5,000–$10,000", timeline: "1–3 months", message: "A members' space for art + music.\nCan we include a café?" });
  const url = new URL(draft.mailto);
  assert.equal(url.pathname, CONTACT_EMAIL);
  assert.equal(url.searchParams.get("subject"), draft.subject);
  assert.equal(url.searchParams.get("body"), draft.body);
  assert.match(draft.body, /Thanks,\nAlex & Lee$/);
  assert.match(draft.body, /a=1&b=2/);
  assert.equal(new URL(draft.gmail).searchParams.get("body"), draft.body);
  assert.equal(new URL(draft.gmail).searchParams.get("to"), CONTACT_EMAIL);
});
test("optional fields produce useful defaults without empty company lines", () => {
  const draft = buildInquiry({ name: "Sam", company: "", project: "", budget: "", timeline: "", message: "I would like to discuss a new website." });
  assert.match(draft.body, /Budget: Let's discuss/);
  assert.match(draft.body, /Timeline: Flexible/);
  assert.doesNotMatch(draft.body, /Company/);
});
