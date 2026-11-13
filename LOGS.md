# Work log

## 2026-11-13 — returning-visitor redirect loop

- Edward reported ERR_TOO_MANY_REDIRECTS on the main address. Fresh public requests returned 200 while the existing browser failed on bare apex/www; the referral-query URL worked. The initial cutover had reversed the previous permanent apex-to-www redirect, creating a loop in browsers holding that cached response. The original checks covered fresh requests and missed returning visitors.
- Corrected Cloudflare's rule to upgrade HTTP on the same host and removed application www-to-apex redirects. Both HTTPS hosts now serve the site, with apex canonical metadata unchanged. Added a regression case for the cached old redirect and a focused cache-only recovery response at /?refresh=20261113; cookies, storage, and form drafts are untouched.
- All 18 tests, TypeScript checking, and the production build passed. The corrected Cloudflare rule is enabled; release uses the existing signed main-branch webhook.

## 2026-11-13 — main-domain migration

- Edward authorized moving the inquiry site to edsong.xyz and the existing professional profile to profile.edsong.xyz, preserving old contact URLs, then pushing and deploying the change.
- Updated canonical/social/sitemap/robots URLs and accepted form origins. Added permanent host redirects preserving paths/query information, with API/static-runtime exceptions for existing signed hooks and open forms. Known old profile case-study and resume paths redirect to the moved profile.
- Added regression tests for path/referral preservation, API exceptions, alias canonicalization, old profile links, and safe fixed redirect origins. No mail secret or recipient change is needed.
- All 17 tests, TypeScript checking, and the production build passed. Live verification identified standalone Next's internal nextUrl hostname; the proxy now uses Caddy's forwarded public hostname for redirects. Legacy APIs remain excluded.
- Completed the Cloudflare Tunnel handoff, HTTPS/apex redirect rule, and profile DNS/binding. Contact release fcc1a64 and profile release 1a505d1 deployed successfully; the original signed contact webhook triggered a successful deployment after cutover. Map release 8dcd002 and Hub release 0a09492 updated their profile integrations and are live.
- All 23 live migration checks passed: canonical pages, old contact paths/referrals, profile case studies and resume, API origin validation, unsigned-hook rejection, map framing policy, and the Hub client link. Browser checks confirmed the new profile and old-contact-to-main-to-form navigation. No inquiry email was sent during the migration. Screenshots and machine-readable verification are retained under ignored artifacts/.

## 2026-11-13 — identify each project inline

- Edward clarified that the few words should identify what each project is, directly after its name with a vertical separator. Replaced taglines with his supplied types: Nonprofit for Find the Next 6,000 and TROA; Law firm for Ryu Legal; Open source for MyWord; Independent game studio for QFin Games.
- Removed the separate caption paragraphs and used a smaller inline type that can wrap as a unit on narrow layouts. Project previews, links, Back, and inquiry navigation remain.
- All 11 tests, TypeScript checking, and the optimized production build passed. Release uses the existing main-branch webhook to personal Coolify.

## 2026-11-13 — reduce portfolio copy

- Edward requested only each site/business name and a few words, explicitly removing category labels such as community initiative, professional services, website, and volunteer work.
- Replaced all five long descriptions with brief phrases, removed all category/status labels and repeated View website copy, shortened the intro to Selected work, and removed the supporting CTA sentence. Kept real previews, linked names/arrows, Back, and Start a project.
- Updated repository guidance so the earlier audit recommendation for more project copy does not override Edward's preference for brevity.
- All 11 tests, TypeScript checking, and the optimized production build passed. Release uses the existing main-branch webhook to personal Coolify.

## 2026-11-13 — full contact-site audit and navigation repair

- Edward reported the missing portfolio Back button and requested a full audit and rating. Added an explicit Back link, preserved source context in form return links, and added a matching 404 with a home action.
- The audit found a no-JavaScript GET fallback in the form. It now declares POST to /api/inquiry and keeps controls disabled until the client is interactive. Initial HTML and hydrated browser behavior were checked.
- Improved headline, footer, placeholder, button-hover, border, and focus contrast, plus small navigation/helper text. Added baseline CSP and production host-only HSTS. No main-profile or other project changes.
- Public route/link, header, client-asset privacy, invalid API, dependency, source, keyboard, responsive, and local form-error checks are documented in docs/site-audit-2026-11-13.md. Overall post-fix review rating: 8.5/10, with explicit limits and remaining recommendations.
- All 11 tests, TypeScript checking, and production build passed. Browser checks covered 320, 390, and 768 CSS-pixel layouts plus desktop. Local invalid/temporarily-unavailable submissions preserved the draft and focused validation errors. No email was sent. Production dependency scan reported zero vulnerabilities; secrets remain runtime-only by Coolify flags.
- Release uses the existing personal GitHub main webhook and Coolify app. Raw release verification and screenshots are retained locally under ignored artifacts/.

## 2026-11-13 — separate selected-work gallery

- Edward asked for a client-facing portfolio at contact.edsong.xyz/portfolio, keeping his main profile separate, then broadened the choice of work and requested a rethink from scratch.
- Added a restrained screenshot-led gallery featuring Find the Next 6,000, Ryu Legal, TROA, MyWord, and QFin Games. Captured their current public homepages; no private dashboard or real message content is used. Volunteer and alpha/private-pilot context is explicit.
- Changed the homepage wordmark to this site's home and My work to /portfolio. Preserved normalized referral context through the gallery and inquiry links. Added portfolio metadata and sitemap entry; the existing form and mail delivery code are unchanged.
- All 11 tests, TypeScript checking, and the optimized production build passed. Browser review covered desktop and an observed 390 CSS-pixel layout with no horizontal overflow, loaded project previews, accessible project headings/links, homepage-to-gallery-to-form navigation, sanitized referral propagation, and no public recipient address or browser warnings/errors. No email was sent. The production client bundle scan found no fixed recipient address or mailto link.
- Pushed b05fe410c2af899638a5a027314bd0c2be50594a to main; signed webhook deployment bfc3fqxetjmydqdb82jeh0u5 finished successfully. Coolify reports running:healthy. Public portfolio and health return 200, the canonical and sitemap include /portfolio, and the fixed recipient is absent from rendered HTML. Live browser checks confirm all five previews load, project keyboard focus is visible, and the portfolio-to-form referral path works. Main profile and other projects were not changed.

## 2026-11-13 — short inquiry form

- Edward authorized a short form, LinkedIn removal, delivery to edwardsong08@gmail.com, and a production push/deploy while keeping the minimal Apple-like design.
- Added /start with name, email, and message, plus real server-side mail delivery through Resend. Added validation, honeypot, bounded request bodies, process-local abuse limits, safe retry keys, and clear failure/success states.
- Changed the homepage CTA to Start a project; removed LinkedIn. Footer referral context is optional and limited to a hostname.
- Edward explicitly authorized reusing the personal portfolio Resend credential, storing it as a runtime-only secret in this app, and sending one test inquiry. RESEND_API_KEY is configured in Coolify with build-time access disabled; no credential value is stored in this repository.
- All 11 tests, TypeScript checks, and the production build pass. Browser checks confirm the three-field design, referral context, removed LinkedIn link, and a truthful unavailable-delivery response that preserves the message when no mail credential is configured.
- The personal sending domain had failed verification because its DNS records were absent. Added Resend's DKIM TXT and the send subdomain's SPF TXT/MX records in Cloudflare; Resend now reports the domain and all three records verified.
- Submitted exactly one authorized test through the local form, reference CONTACT-20261113-FORM-01. The form showed Message sent; Resend confirms delivered to edwardsong08@gmail.com from noreply@edsong.xyz with the expected Reply-To. Production push 5e2f7fa deployed successfully through webhook deployment h61b48xohecc3mueoliodez3.
- Edward then requested removal of his personal email from the page. Removed the homepage email/copy controls, form email alternative, and noscript address; moved the recipient constant to the server mail module and updated error copy. Form delivery remains unchanged.

## 2026-11-13

- Created the personal contact site at Edward's request, with GitHub, a deployment webhook, and personal Coolify hosting as the intended release workflow.
- Confirmed inquiry recipient with Edward: edwardsong08@gmail.com.
- Created personal GitHub repository edwardsong08/contact-edsong, production branch main.
- Created contact-edsong under personal Coolify / Edward Song / production, with Dockerfile builds and container port 3000.
- Configured contact.edsong.xyz; Coolify reports matching DNS. Coolify also generated a www alias; its removal was blocked by automatic approval review, so it remains unchanged.
- Registered a push-only GitHub webhook with a 256-bit random shared secret. No secret is stored in the repository.
- Passed production build, TypeScript checking, and inquiry encoding tests. Verified desktop rendering, all three interactive project concepts, and the complete draft builder with special characters in the browser. No email was sent.
- Initial Docker deployment completed successfully at commit 6939b9f. Direct delivery to Coolify's advertised public admin port failed because GitHub could not connect.
- Edward rejected the long initial page as bloated and requested an Apple-like experience. Replaced it with a single screen, system typography, concise copy, one blue email CTA, and copy-email fallback. Removed the mockups, service sections, FAQ, brief builder, and font packages.
- Added a narrowly scoped HTTPS deployment relay at /api/deploy to keep Coolify's admin port private. Signature, repository, branch, upstream failure, and payload-size tests pass. Runtime configuration stays in Coolify.
- Simplified release be6598a deployed successfully. Public HTTPS returns 200, the long-page sections are absent, and an unsigned POST to /api/deploy is rejected with 401.
- Switched the GitHub webhook to https://contact.edsong.xyz/api/deploy. Auto deploy is enabled in Coolify; both relay settings are runtime-only.
- Adjusted vertical spacing for shorter displays. GitHub push 892e768 triggered deployment old2pt5vka6w2ri3jny3fhd6 automatically; it finished successfully with is_webhook=true. Application status is running:healthy and the Docker healthcheck is detected.
- Verified the simplified public page, direct mailto destination, working copy-email button, and zero browser warnings/errors. No email was sent. Exact mobile viewport emulation was unavailable in the connected browser; responsive CSS is implemented but that device-size visual check is unverified.
