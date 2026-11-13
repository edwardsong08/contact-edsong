# Domain migration — November 13, 2026

Edward authorized the existing inquiry site becoming the main public site, keeping his professional profile separate and preserving old links. The migration is deployed.

| Address | Current behavior |
| --- | --- |
| https://edsong.xyz | Inquiry homepage, /portfolio, and /start |
| https://www.edsong.xyz | Visitor pages redirect 308 to HTTPS apex |
| https://contact.edsong.xyz | Visitor pages redirect 308 to the matching main-site path |
| https://profile.edsong.xyz | Existing professional profile and case studies |
| Old main-domain /work paths and resume | Redirect 308 to the matching profile path |

Redirects preserve paths and query/referral information. Legacy API routes stay available without redirects so the existing signed deployment webhook and already-open forms continue working. Production inquiry validation accepts the canonical and legacy site origins. The fixed mail recipient and runtime-only secrets are unchanged.

## Routing ownership

The apex and www records use the existing Cloudflare Tunnel. Their published routes retain the same Coolify proxy service and now use the inquiry app's existing generated hostname as the HTTP Host Header override. The profile has a separate proxied A record and HTTPS domain binding on its original Coolify app. Other tunnel routes are unchanged.

The existing Cloudflare redirect rule is now named **Canonical HTTPS and apex**. Its custom expression is:

```text
((http.host eq "www.edsong.xyz") or ((http.host eq "edsong.xyz") and not starts_with(http.request.full_uri, "https://"))) and not starts_with(http.request.uri.path, "/api/")
```

The dynamic target is `concat("https://edsong.xyz", http.request.uri.path)`, with status 308 and query preservation enabled. Application redirects in `src/proxy.ts` use the forwarded public host because standalone Next's internal request URL can contain the listener hostname.

## Release evidence

- Inquiry source: `edwardsong08/contact-edsong`, main, functional release `fcc1a64d3e282b9f4c7d73c28e1fbf02f3f3a2fc`. Its original signed GitHub webhook successfully deployed this release after the routing switch.
- Profile source: `edwardsong08/final-profile`, master, functional release `1a505d1db542121801384f7d8cc4a85798fec92a`. The release was isolated from the previously deployed revision; unrelated local profile drafts were preserved.
- Map dependency: `troainc/troa-realms-map-v2`, main, `8dcd00251c5551fab13917975ca8d806cf1b7d9a`, adding the new profile origin to its public embed policy and parent-message validation.
- Hub dependency: `edwardsong08/Main-Hub`, main, `0a094921a4c6479e7609bb6dc67e50d4c7107e9f`, updating its Profile Site node URL.

Contact: 17 tests, typecheck, and production build passed. Profile: lint, CSS lint, typecheck, 25 unit tests, pinned-Node production build, and production dependency audit passed. Map: frontend/server typechecks, 290 tests, and builds passed. Hub: lint and pinned-Node production build passed.

All 23 live migration checks passed, including public pages and canonicals, path/query redirects, profile case study/PDF access, API origin validation without sending mail, original hook protection, map frame policy, and the Hub's deployed client link. Profile TLS was verified normally against a public Cloudflare edge while the local gateway still cached an earlier DNS miss; the browser subsequently loaded the new profile hostname successfully. Browser navigation also confirmed referral retention into and back from the inquiry form. No live mail submission was made.

Ignored `artifacts/domain-migration-verification.json` contains the detailed check results. Live screenshots are `artifacts/edsong-main-live.png` and `artifacts/profile-domain-live.png`.
