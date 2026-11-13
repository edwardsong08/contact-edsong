import assert from "node:assert/strict";
import test from "node:test";
import { getSiteRedirect } from "../src/lib/site.ts";

test("old contact links retain their path, referring site, and fragment", () => {
  for (const host of ["contact.edsong.xyz", "www.contact.edsong.xyz"]) {
    for (const path of ["/", "/portfolio", "/start"]) {
      assert.equal(getSiteRedirect(new URL(`https://${host}${path}?from=client.example#main`))?.href, `https://edsong.xyz${path}?from=client.example#main`);
    }
  }
});

test("the www alias uses the main site and clears an upstream port", () => {
  assert.equal(getSiteRedirect(new URL("http://www.edsong.xyz:3000/start?from=example.com"))?.href, "https://edsong.xyz/start?from=example.com");
});

test("legacy profile case studies and resume links reach their matching new paths", () => {
  for (const path of ["/work/troa", "/work/hub", "/Resume-Edward_Song.pdf", "/case-studies/ryu-home-full.webp", "/og/edward-song-zen.png"]) {
    assert.equal(getSiteRedirect(new URL(`https://edsong.xyz${path}?source=old-link`))?.href, `https://profile.edsong.xyz${path}?source=old-link`);
  }
});

test("canonical pages and unrelated hosts do not redirect", () => {
  for (const url of ["https://edsong.xyz/", "https://edsong.xyz/portfolio", "https://edsong.xyz/start", "https://profile.edsong.xyz/work/troa", "https://other.example/start"]) assert.equal(getSiteRedirect(new URL(url)), null);
});

test("old API and Next asset URLs remain available without redirecting signed bodies", () => {
  for (const path of ["/api/deploy", "/api/inquiry", "/api/health", "/_next/image", "/_next/static/example.js"]) assert.equal(getSiteRedirect(new URL(`https://contact.edsong.xyz${path}`)), null);
});

test("a double-slash path, query, or userinfo cannot change the redirect destination", () => {
  const result = getSiteRedirect(new URL("https://user:password@contact.edsong.xyz//other.example/start?next=https://other.example"));
  assert.equal(result?.origin, "https://edsong.xyz");
  assert.equal(result?.pathname, "//other.example/start");
  assert.equal(result?.username, "");
  assert.equal(result?.password, "");
});
