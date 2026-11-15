import assert from "node:assert/strict";
import test from "node:test";
import { NAVIGATION_KEY, entryForHistoryUpdate, nextNavigationEntry, readNavigationEntry, siteHref, withNavigationEntry } from "../src/lib/site-navigation.ts";

test("Back is restricted to known public pages on the current origin", () => {
  const base = "https://edsong.xyz/about";
  assert.equal(siteHref("/portfolio?from=client.example#work", base), "/portfolio?from=client.example#work");
  for (const destination of ["https://client.example/", "//evil.example/start", "/api/inquiry", "/unknown", "javascript:alert(1)", "https://user@edsong.xyz/start"]) {
    assert.equal(siteHref(destination, base), null);
  }
});

test("a direct arrival has no claimed previous page, and fallback replacement stays bounded", () => {
  const direct = nextNavigationEntry(null, null, "/start?from=client.example", "replace");
  assert.equal(direct.back, null);
  const home = nextNavigationEntry(direct, direct.href, "/?from=client.example", "replace");
  assert.equal(home.back, null);
  assert.deepEqual(nextNavigationEntry(home, home.href, "/about?from=client.example", "push").back, { href: "/?from=client.example", steps: 1 });
});

test("route entries retain their own Back targets across browser traversal and reload", () => {
  const home = nextNavigationEntry(null, null, "/", "replace");
  const about = nextNavigationEntry(home, "/", "/about?from=client.example", "push");
  const work = nextNavigationEntry(about, about.href, "/portfolio?from=client.example", "push");
  const aboutState = JSON.parse(JSON.stringify(withNavigationEntry({}, about)));
  const restored = readNavigationEntry(aboutState, about.href);
  assert.deepEqual(restored?.back, { href: "/", steps: 1 });
  assert.deepEqual(work.back, { href: about.href, steps: 1 });
  assert.equal(readNavigationEntry(aboutState, work.href), null);
  assert.deepEqual(nextNavigationEntry(restored, about.href, "/resume", "push").back, { href: about.href, steps: 1 });
});

test("Back skips query and fragment entries on the same page", () => {
  const page = nextNavigationEntry(null, "/portfolio", "/resume", "push");
  const query = nextNavigationEntry(page, page.href, "/resume?from=client.example", "push");
  const hash = nextNavigationEntry(query, query.href, "/resume?from=client.example#main", "push");
  assert.deepEqual(hash.back, { href: "/portfolio", steps: 3 });
  assert.deepEqual(nextNavigationEntry(hash, hash.href, "/resume?from=other.example", "replace").back, hash.back);
});

test("replacing a route never treats the removed route as its previous page", () => {
  const current = nextNavigationEntry(null, "/about", "/portfolio", "push");
  assert.deepEqual(nextNavigationEntry(current, current.href, "/start", "replace").back, { href: "/about", steps: 1 });
  assert.equal(nextNavigationEntry(current, current.href, "/about", "replace").back, null);
});

test("native fragment entries keep their previous page when the router replaces their copied state", () => {
  const resume = nextNavigationEntry(null, "/about", "/resume?from=client.example", "push");
  const copied = withNavigationEntry({}, resume);
  const hashHref = resume.href + "#main";
  const current = entryForHistoryUpdate(copied, hashHref);
  const stamped = nextNavigationEntry(current, hashHref, hashHref, "replace");
  assert.deepEqual(stamped.back, { href: "/about", steps: 2 });
  const emptyNativeState = entryForHistoryUpdate(null, hashHref, resume);
  assert.deepEqual(emptyNativeState?.back, { href: "/about", steps: 2 });
  assert.equal(entryForHistoryUpdate(null, "/start#main", resume), null);
  assert.equal(entryForHistoryUpdate(copied, "/start#main"), null);
  assert.equal(entryForHistoryUpdate(copied, "/resume?from=other.example#main"), null);
});

test("rejects malformed or unsafe history markers", () => {
  for (const back of [{ href: "//evil.example", steps: 1 }, { href: "/api/inquiry", steps: 1 }, { href: "/about#main", steps: 1 }, { href: "/", steps: -1 }, { href: "/", steps: 0 }, { href: "/", steps: "1" }, { href: "/", steps: 1.5 }]) {
    assert.equal(readNavigationEntry({ [NAVIGATION_KEY]: { href: "/about", back } }, "/about"), null);
  }
  assert.equal(readNavigationEntry(null, "/about"), null);
});

test("navigation markers preserve router-owned state without mutating it", () => {
  const tree = { opaque: "router data" };
  const original = { __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: tree };
  const entry = nextNavigationEntry(null, null, "/", "replace");
  const tagged = withNavigationEntry(original, entry);
  assert.equal(tagged.__PRIVATE_NEXTJS_INTERNALS_TREE, tree);
  assert.equal(tagged.__NA, true);
  assert.equal(NAVIGATION_KEY in original, false);
  assert.deepEqual(withNavigationEntry(tagged, null), original);
});
