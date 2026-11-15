# Work log

## 2026-11-13 — approved shorter copy and refinement release

- Edward found the first-person description wordy and approved "Websites and web apps. From landing pages to complete platforms." He then explicitly requested the change and deployment, superseding the initial local-only review boundary.
- The release includes the reviewed typography, wordmark, form-copy, and button refinements, with portfolio navigation still hidden. The gallery remains available through direct/legacy links. Production mail settings, API protections, and host routing are unchanged.
- All 18 tests, TypeScript checking, and the production build passed with the final approved copy. Release is promoted to main through the existing signed deployment webhook.

## 2026-11-13 — local personal-copy and typography refinement

- Edward approved the proposed refinements and requested a local preview, keeping portfolio navigation hidden. Work is on codex/contact-refinements-local from cec9724; nothing in this pass is pushed or deployed.
- Kept the existing headline and two-page structure. Added first-person homepage copy, a stronger plain-text wordmark, looser headline tracking and phone sizing, solid gray secondary headline text, and restrained hover/press feedback with reduced-motion support. Internal navigation uses right/left arrows; Send message is a plain submit action with a stable width while sending.
- Simplified the form to Tell me your idea / A few sentences is plenty, with a useful message prompt and I'll reply personally. The three fields, POST/hydration guard, validation, draft preservation, backend protections, and hidden portfolio route remain intact. Disabled the Next dev indicator for a clean preview.
- All 18 existing tests, TypeScript checking, and the production build passed; the preview's development configuration compiled successfully. Browser review covered desktop and observed narrow phone widths (including 390 CSS pixels), with no horizontal overflow, hidden work navigation, and referral-preserving home-to-form links. A local credential-free submission returned the expected 503, displayed the unavailable message, and retained the draft. No email was sent; generated test data was cleared afterward.
- Preview runs on http://127.0.0.1:3096, bound only to loopback, without a mail credential. Source review used the React best-practices checklist; no dependencies, client effects, or backend behavior were added.

## 2026-11-13 — temporarily hide work navigation

- Edward requested hiding My work without deleting the portfolio, leaving home and Start a project as the promoted flow. Added one shared false visibility flag around the existing home/404 links; the gallery, its assets, and direct/legacy URLs remain intact.
- All 18 tests, TypeScript checking, and the production build passed. React review confirmed server-rendered conditional links, no new client state/dependencies, and preserved keyboard navigation and form referral flow. Release uses the existing main-branch deployment webhook.
- The separate FTN6k footer/credit question is pending discussion; no FTN6k source was changed in this work.

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

## 2026-11-13 — Local personality preview
- Added the supplied portrait as a circular home link; kept the portfolio hidden.
- Added Light, Tokyo Midnight, Neon Dark, Silver/Noir, and Matcha Garden, stored only in browser localStorage. Pre-paint theme restoration prevents a light flash on reload.
- Added on-demand blob physics and drawing modes, with cleanup on route changes, keyboard controls, reduced-motion behavior, pause/reset, Escape/Done, and bounded drawing history.
- Browser verified drag merge (5 to 4), tap split (4 to 5), drawing and Undo, theme persistence into the form and after reload, and narrow layout without horizontal overflow. No real inquiry sent.
- 18 existing tests and typecheck passed. Production build passed outside sandbox after Windows blocked standalone output creation in sandbox.
- Local preview only, loopback port 3096. Nothing pushed or deployed.

## 2026-11-13 — Stronger themes, local review
- Removed the blob toy entirely; split the retained drawing into DrawingCanvas with pointer capture, bounded history, tap dots, Undo/Clear/Done, and Escape exit.
- Renamed themes Default / Tokyo Midnight / TRON / Silver Noir / Matcha Garden. Preserved existing local preference IDs.
- Removed the introductory eyebrow; kept the exact headline and accented Beautifully in blue on Default.
- Added theme-specific scenery, surfaces, typography, pointer light/metal effects, TRON focus/hover light trace, and Matcha leaf unfolding. All scenery is decorative; no continuous animation loop.
- Verified all five mobile themes at measured 364px CSS width: no horizontal overflow, settings fit. Checked desktop visuals, themed mobile form, drawing/Undo, and Escape focus restoration. Secondary text palette contrast exceeds 4.5:1; darkened Matcha further to allow for its paper/background treatment.
- Typecheck, all 18 regression tests, and production build pass. Local-only changes on codex/personal-play-local; no push, deploy, or real email.

## 2026-11-13 — Compact palette and bare gear
- Matched gear SVG to the 44px portrait and removed background, border, shadow, and circular focus decoration in all themes. Browser measurements confirm equal size and transparent styling for each theme.
- Restored Default's deployed grey second headline line; type scale remains the main-branch style.
- Reduced the menu to five names/visual samples and Doodle, with an animated accessible switch. Toggle on/off verified to mount/unmount drawing; focus remains on the switch.
- Local-only refinement. No push or deploy.

## 2026-11-14 — Local refinement with rollback
- Saved the exact prior local state as commit 1d813cf on rollback/local-before-refinement-20261114 before editing. Continued on codex/theme-refinement-20261114.
- Consolidated obsolete and repeated control styles into appearance.css; shared settings/drawing surfaces, radii, focus, and motion.
- Refined the bare 44px gear geometry and rotation, removed duplicate selection marks, improved label size, and added semantic radio-group keyboard behavior and focus-leave dismissal.
- Reduced Doodle toolbar to three inks, accessible Undo/Clear icons, and Done; normalized coordinates for resizing and retained bounded, local-only strokes.
- Softened theme scenery while preserving each theme's identity and Default's deployed headline style.
- Browser verification: arrow/End theme selection, Space toggle, drawing/Undo/Escape focus return, all five themes on homepage/form at 364px measured CSS width with no horizontal overflow, three form fields, drawing absent on form, and transparent 44px gear in each theme. Real touch-device and OS reduced-motion emulation are not part of this browser check; touch pointer capture and reduced-motion rules remain implemented.
- Typecheck, 18 existing regression tests, and production build passed. Nothing pushed or deployed.

## 2026-11-14 — Immersive themes, local only
- Created rollback/local-before-immersive-themes-20261114 at da2e0f3 before edits; earlier rollback retained.
- Replaced Tokyo/Noir cursor spotlights; built custom vector Tokyo city and Matcha garden, animated TRON circuit paths, and localized Silver Noir title smoke.
- Added persistent Motion switch; retained Doodle, bare 44px gear, grey Default headline, and hidden portfolio.
- Browser checked desktop scenes and all five themes on home and inquiry at 320px CSS width: no horizontal overflow. Fixed smoke overflow and garden footer contrast/mobile plant cropping. Motion off pauses rain, hides smoke, persists reload; resumed successfully. No browser errors/warnings captured. Form navigation retains the short three visible fields plus hidden honeypot; no real message sent.
- Typecheck, 18 regression tests, and production build passed. Reduced-motion is implemented through media-query rules and live media listeners; OS-setting and physical touch-device tests were not performed.
- No push/deployment; local preview at http://127.0.0.1:3096/.

## 2026-11-14 — Custom artwork and actual profile dispersion
- Preserved ca58536 on rollback/before-art-direction-20261114.
- Generated bespoke Tokyo alley and tactile tea botanical artwork; stored optimized project-owned WebP assets. Rebuilt TRON as a unified perspective arena with moving lights/reflections.
- Ported actual profile fluid-watercolor-study.js solver, retaining license; replaced image input with a measured headline texture. Removed the old puff emitter. Added transparent output, same-origin messaging, renderer teardown, idle pause, and context-loss fallback.
- Browser verified desktop artwork, actual letter breakup, mobile renderer, Motion teardown, and all five home/form themes at 320px without horizontal overflow. Fixed mobile botanical crop and iframe color-scheme transparency.
- Typecheck, 18 existing tests, and production build pass. No actual inquiry email sent, no push, no deploy. OS reduced-motion and physical touch-device checks remain unperformed.

## 2026-11-14 — Cinematic illustration and quicker fluid response
- Saved 2eb5b2f on rollback/before-cinematic-themes-20261114.
- Added custom desktop/portrait digital Tokyo and TRON art, plus illustrated Matcha pond garden. Prior images preserved.
- Corrected lost pointer momentum between glyphs; stronger bounded displacement, quicker recovery, and frame-rate-aware delta cap. Verified visible response to a quick browser pointer sweep.
- Local-only review; no push/deployment. Typecheck and 18 tests passed; build and final mobile checks recorded in completion.
- Final build passed; desktop and portrait Tokyo/TRON plus illustrated Matcha reviewed at 350px CSS width, with no horizontal overflow observed. Inquiry navigation verified. Browser error/warning log empty. Preview left on TRON.

## 2026-11-14 — Integrated scene motion and Matcha interaction
- Rollback branch rollback/before-scene-motion-20261114 preserves 6fbaca2.
- Removed Motion menu control and all stored preference gates; preserved automatic reduced-motion behavior.
- Added bounded scene-motion renderer: synchronized Tokyo lights/rain/reflections, artwork-aligned TRON light-wall pulses, and sparse Matcha falling leaves/pond ripples.
- Verified canopy/pond pointer delivery and live leaves/ripples, simplified theme+Doodle menu, Doodle mount/Done, narrow layout without overflow (291px measured CSS width). Scene pointer layer does not capture events. Build, typecheck, and 18 tests passed. OS reduced-motion and physical touch hardware not exercised.
- Local only. No push, deployment, or real inquiry email.

## 2026-11-14 — Portrait and navigation contrast
- Saved rollback/before-control-contrast-20261114. CSS-only portrait border, gear contrast/stroke/focus, and inquiry/portfolio Back-link refinements.
- Checked shared styles across all five themes; visually reviewed TRON home/form and Matcha form. Escape restores gear focus with 3px stroke and no underline. Browser warning/error log empty. No push or deploy.

## 2026-11-14 — Silver Noir typography and material refinement
- Preserved 9e009cc on rollback/before-noir-text-alignment-20261114.
- Replaced stretched canvas word redraw with actual browser text layout capture. Desktop static/effect comparison produced matching baselines and bounds within one pixel at the right edges. Reviewed responsive effect at measured 425px CSS width without overflow, then reset viewport.
- Removed frame lines; final charcoal/silver palette follows user correction against an all-black page. Retuned fluid breakup/velocity/recovery and added a 350ms final handoff to crisp text.
- Observed dispersion and full text recovery; no browser errors/warnings. Typecheck, JS syntax, 18 existing tests, and final production build passed. No push/deploy. Preview remains local.

## 2026-11-14 — Cinematic TRON world and more integrated light
- Preserved e40c670 at rollback/before-abstract-tron-20261114. Retained earlier accepted composition through custom built-in image edits removing bikes/towers; final desktop and portrait WebP assets are about 175 KB together. Prompts saved in artifacts/tron-final-art-prompts.md.
- Added mapped multi-path signals, nearby-line illumination and bidirectional click/touch pulses; smooth interpolation, bounded effects and lifecycle guards. No headline/portfolio/backend changes.
- Isolated localhost browser checks passed: visible changing motion layer, Start/Back navigation, mobile 390x844 without overflow, correct portrait art, reduced-motion static fallback, no page errors. Noir static/effect bounding boxes matched exactly after switching from Default and Matcha, and recovery restored full DOM opacity. Screenshot/report artifacts saved locally.
- Normal preview tooling became unavailable; unrelated HR browser inspection was auto-review rejected. Used a fresh headless Edge profile only against localhost instead, without accessing existing user tabs.
- 18 tests and typecheck passed. Local-only preview restarted on 127.0.0.1:3096. No push or deployment.
- Final production build passed after the mobile framing correction.


## 2026-11-14 � Local finish refinement after five-theme audit
- Saved exact rollback/before-finish-refinement-20261114 at 22a27b4 before editing. Artwork, headline, inquiry backend and hidden portfolio retained.
- Refined palette/thumb/switch materials, mobile spacing, theme buttons and forms; retained the portrait-sized bare gear and keyboard focus.
- Tokyo light/weather coupling, TRON floor-plane reflections and quieter upper framing, cached painted Matcha leaves/shoreline-clipped ripples, and less diffuse Noir recovery.
- Doodle smoothing/coalesced events now update one live path per frame, with bounded completed strokes and no React state update per pointer sample.
- Typecheck, JS syntax and 18 tests passed. Build initially hit sandbox EPERM writing existing standalone output; the authorized native rerun passed.
- Fresh isolated headless Edge on localhost passed five-theme responsive checks (320/390/768/1440), desktop/mobile forms, keyboard focus restoration, Doodle drawing/Clear/Done, motion output and OS reduced-motion. No page errors. Noir rest/interactive title edges identical from Default and Matcha; crisp DOM text restored after settling. Saved review screenshots/report under artifacts/finish-refinement. Physical touch hardware not exercised; no actual inquiry sent.
- Changes remain local and uncommitted for review. No push or deployment; rollback branch preserved.


## 2026-11-14 - Responsive sizing and mobile release checks
- User authorized deploying after proportional background correction and mobile checks. Checkpointed approved refinements at c91c087; rollback/before-responsive-scaling-20261114 preserves them.
- Replaced distorted frame-filling image sizes with cover crops, aspect-based portrait artwork, and shared image/screen coordinate mapping for motion. Added two geometry regressions.
- Chromium and WebKit mobile checks passed all five themes, forms, viewport contraction, Doodle and reduced motion, plus portrait tablet/landscape/wide layouts. WebKit testing found and resolved decorative iframe touch interception and a blank first-frame handoff. Targeted touch activation, visible text, recovery and CTA checks passed both engines.
- No physical touch device was connected; hardware keyboard/scroll performance remains unmeasured. No inquiry submitted. Production build initially hit a Windows lock from the temporary standalone preview; stopped the owned preview before rebuilding.


## Verified theme release - November 14, 2026
Application code 290b3f38dcbc8318b166ea75fc6ee443e25a064a was pushed to main and deployed by the existing signed webhook. Personal Coolify deployment x6bku8k4m8lpajbyzoayzdal finished successfully at 2026-11-15 04:23:26 UTC; application status running:healthy. Public Chromium and WebKit touch-emulated sessions passed all five themes, Noir activation/recovery, hidden portfolio and home/form/back navigation with no page errors. edsong.xyz and www.edsong.xyz returned 200; contact.edsong.xyz/start retained its path and referral query in its permanent redirect. Health and same-origin Noir iframe policy passed. No actual inquiry was submitted. Physical phone/native keyboard behavior remains untested.
All 20 tests, TypeScript, fluid JS syntax and final production build passed. Rollback branches are pushed to GitHub: rollback/production-before-themes-20261114 (3fd0813) and rollback/before-responsive-scaling-20261114 (c91c087). Full local/live reports and screenshots are in ignored artifacts/responsive-release. This verification note changes documentation only; the application code remains 290b3f3.


## 2026-11-15 - Local gear, TRON phone and Noir refinements
- Preserved clean 00bb13a as rollback/before-detail-refinement-20261115; work is on codex/detail-refinement-local-20261115. No push/deployment authorized or performed.
- Rounded and softened the full-size bare gear silhouette; retained 44px target and visible keyboard focus without a circle/underline.
- Reframed tall-phone TRON using the complete existing portrait asset, proportional width fit and a fading foreground. Shared geometry and light/reflection opacity track the artwork; added a geometry regression.
- Reduced Noir letter stretching, added diffusion only to detached wisps, strengthened uneven breakup and advanced local recovery. Retained source typography, exact activation alignment, original solver/license, touch-safe overlay and DOM fallback.
- 21 tests, typecheck, fluid JS syntax and production build passed. Chromium/WebKit local checks passed theme/form/gear/Doodle/reduced-motion behavior and targeted Noir touch activation, visible output, recovery and CTA. Static/interactive headline bounds identical from Default and Matcha; no page errors. Reviewed additional 320/390/430 phone compositions and controlled rollback-versus-current Noir traces.
- All artwork files and hidden portfolio preserved. No actual inquiry sent; physical phone/native keyboard not tested. Local preview: http://127.0.0.1:3096/. Evidence: artifacts/detail-refinement/. Changes remain local for user review.


## 2026-11-15 - Approved detail refinement release
- User authorized deployment after local validation. Confirmed GitHub main is still 00bb13a and personal Coolify application is healthy on main.
- Preparing the reviewed changes for release through the existing webhook, retaining rollback/before-detail-refinement-20261115. Live verification follows deployment.


## Verified detail refinement deployment - November 15, 2026
Released d44063a36090445bfff9e11c9694a87f223654f6 through main and the signed webhook. Personal Coolify deployment 9gajuahyhvm3e4ttejlzmka5 finished at 2026-11-15 05:19:13 UTC; application running:healthy. Rollback rollback/before-detail-refinement-20261115 (00bb13a) is preserved on GitHub.
Live edsong.xyz and www.edsong.xyz returned 200; old contact.edsong.xyz/start retained its path and referral query in the redirect. Health and same-origin Noir iframe policy passed. The public fluid asset exactly matches the committed release (comparison uses Git bytes, not Windows checkout line endings). Isolated Chromium/WebKit passed all five themes, revised 44px gear, proportional top-anchored TRON phone composition, Noir touch/recovery, hidden portfolio and home/form/back navigation with no page errors. No actual inquiry sent. Physical phone/native keyboard behavior remains untested. Evidence: artifacts/detail-refinement/live-report.json and live browser captures. Artwork unchanged.


## Matcha gear contrast - November 15, 2026 (local)
User flagged the gear disappearing into Matcha foliage and suggested white. Compared current green, ivory and darker green at 1440/768/390px. Local themes.css now uses warm ivory with a fine dark shadow over the canopy, including hover/open, without a surrounding circle. The light inquiry page retains a dark forest gear. Keyboard focus increases stroke weight. Chromium/WebKit checks passed home/form/back, open/focus and transparent background. Evidence: artifacts/matcha-gear and artifacts/verify-matcha-gear.cjs. Not committed, pushed or deployed; production remains d44063a. Artwork and portfolio visibility unchanged.


## 2026-11-15 - Matcha gear release authorized
- Approved scope: deploy the Matcha gear contrast fix, keeping form gear and back link dark. Local production build and browser checks passed.
- Subsequent Korean-influenced artwork exploration is local only, after release verification. Preserve current assets and rollback.


## 2026-11-15 - Gear shipped; Korean garden stays local
- Released 365d86c through webhook deployment hchoxuk9eb3cbuzc5703xmfu; finished 05:28:20 UTC. Live Chromium/WebKit verified ivory home gear and dark form gear/back. Prior d44063a rollback pushed.
- Created local codex/korean-matcha-local-20261115 and rollback/before-korean-matcha-20261115 at 365d86c. Generated desktop/portrait Korean-inspired garden variants using built-in image edits; retained original and first study assets.
- User steered during local review: reduce homepage color contrast, restore form background detail, use white back/gear on form. Created softer celadon/sage/apricot art, lifted desktop branch clear of the title, removed broad form bleaching, and added ivory local form navigation with fine dark separation. Protected heading/reply-note readability without a full-page wash.
- Aligned responsive garden geometry and leaf/ripple interaction bounds with the dedicated portrait image. Full prompt/source records in ARTWORK.md; browser evidence in artifacts/korean-matcha.
- 21 tests, typecheck and local production build passed. Chromium/WebKit responsive and interaction checks passed; no email sent, no physical device test. No experimental art/form changes deployed; production remains 365d86c.


## 2026-11-15 - Korean Matcha release approval
- User approved deployment of the final reviewed artwork, form contrast and white navigation controls. Local acceptance checks passed; main confirmed at 365d86c.
- Preparing release through the signed main-branch webhook, preserving the original and study assets and pre-art rollback. Live verification pending.


## Verified Korean Matcha deployment - November 15, 2026
Released 564dbf3e144b9def4a8ad8814c50919714bc0f94 through main and the signed webhook. Coolify deployment 9co0pux0o42au0gjawvymffw finished at 2026-11-15 07:01:02 UTC; application running:healthy. GitHub rollback/before-korean-matcha-20261115 preserves prior production 365d86c.
Live desktop/portrait artwork returned 200 and exactly matched the approved asset SHA-256 hashes. Chromium/WebKit passed Matcha at 320/390/768/1440 widths, proportional image selection, no overflow, white form gear/back, pond touch, home/form/back and reduced motion. General live checks passed all five themes, Noir touch/recovery, TRON phone geometry, both edsong hosts, health, legacy contact path/query redirects and same-origin fluid iframe policy. No page errors or actual inquiry submissions. Portfolio remains hidden and original/study artwork is preserved. Evidence: artifacts/korean-matcha-release/report.json, browser captures and artifacts/detail-refinement/live-report.json. Physical phone/native keyboard behavior remains untested.

## 2026-11-15 - Local portrait menu reference pass
- Preserved production 564dbf3 with rollback/before-portrait-menu-20261115; working on codex/portrait-blob-menu-local-20261115.
- Inspected actual HTML/CSS of all four favorite CodePens linked in CONTEXT.md and opened the Gooey Menu live preview; replaced initial large organic bubbles with compact circular fan and SVG goo separation.
- Added three disabled placeholders, theme colors, accessible keyboard/dismissal behavior, and compact-form overlap handling. Preserved artwork, inquiry flow and hidden portfolio.
- 21 tests, typecheck and final build passed. Windows generated standalone packaging intermittently raised EPERM, resolved on retry. CUA reviewed themes, keyboard and 320px form clearance; no console errors. Preview left open locally. No commit, push or deployment.
- Final short-screen pass tightened the homepage arc to clear the headline and separated the More caption from the middle circle. Final production build passed outside the sandbox after recurring Windows EPERM packaging failures; source compilation and TypeScript had already passed. The prior generated standalone folder was retained under artifacts/standalone-before-menu-* during diagnosis. Final preview capture reflects the corrected compact layout.

## 2026-11-15 - Remove header name and unify hover
- Removed visible name and unused Portrait href prop from home/form. Preserved form Back/referral behavior and footer identity.
- Replaced broad wrapper hover with one fixed 44px portrait hit area, restrained circle hover, stationary pointer-transparent captions, and opacity-assisted closing. Removed shadow animation and duplicate responsive rules; retained CSS-only motion and reduced-motion fallback.
- Snapshot of preceding local draft: artifacts/portrait-menu-before-hover-*. Production rollback unchanged.
- 21 tests, typecheck and build passed. CUA verified hover boundary, toggles, keyboard and 320px home/form spacing; reviewed Matcha form. No page errors. Saved header-refined.jpg and left local preview open. No push/deploy.

## 2026-11-15 - Mobile portrait dropdown
- Added a responsive, theme-specific 3-row mobile panel; preserved desktop circle menu. Uses same DOM/state/accessibility, 52px rows, short CSS opacity/translation reveal, no mobile SVG filter or backdrop blur.
- Removed mobile orbit workarounds and form-heading fade. Mobile panel overlays content without moving it. Desktop geometry and materials unchanged.
- Retained pre-change CSS in artifacts/portrait-menu-before-mobile-*. Hidden portfolio and production rollback intact.
- 21 tests, typecheck and build passed; all five mobile themes visually reviewed plus 320px form fit, keyboard/dismissal, and desktop circle fallback. Evidence in artifacts/portrait-menu/mobile-*.jpg. Local only, no deploy.

## 2026-11-15 - Personal pages, editorial resume, Home recovery
- Connected portrait menu to About, existing Selected work gallery, and new Resume. User authorization supersedes placeholders; no extra standalone main-header work link.
- Verified deployed profile PDF by live fetch and SHA-256 equality; exact original copied locally. HTML resume contains verified roles/dates/skills; About photo retained at full 4:3.
- Replaced initial resume card after user feedback with an open editorial timeline, numbered sections, section navigation, and desktop columns/mobile stack.
- Made inner-page Home explicit and sticky, added footer Home, and fixed anchor clearance after user reported missing return navigation. Verified Home click and sticky visibility after scrolling.
- Existing 21 tests/typecheck/build passed; browser desktop/mobile review and menu/referral flow checked. Dark Reader extension caused injected-attribute hydration warning; no suppression added. Local rollback snapshots preserved. No push/deployment.

## 2026-11-15 - Local personal-page refinement
- Saved full pre-pass rollback archive: artifacts/rollback-personal-refinement-20261115-040655.zip; verified readable with 70 entries.
- Unified scrolling Home/portrait/settings controls and full-width quiet header background. Inner Matcha controls use dark ink; homepage treatment retained.
- Removed About card, shortened copy, balanced photo/text; polished gallery into a consistent grid with open captions, responsive labels and CSS screenshot crops; updated image sizing.
- Shortened resume opening/bullets, improved contrast/mobile width, and provided 44px section links. Exact PDF/art files preserved.
- Tests/typecheck/build passed. CUA checked desktop/tablet/phone layouts, theme samples, sticky controls, links/referral flow and no overflow. Known Dark Reader hydration warnings only; no real inquiry sent. Local preview on /about, no push/deploy.

## Start header transparency - November 15, 2026
- Removed reading-header paint from /start and restored original theme navigation colors (ivory in Matcha). Other reading-page treatment unchanged.
- Browser confirmed transparent header/no generated paint in all five themes; visually reviewed Matcha desktop/mobile. CSS-only correction, no inquiry behavior changed. Rollback stylesheet retained; no deploy.

## Portfolio selection refresh - November 15, 2026
- Replaced displayed MyWord with Bifrost Controller, CloseDesk, Grantstead; retained other projects, minimalist captions, referral flow and original MyWord asset.
- Public destinations and original-color previews verified; no private workspace screenshots. Local capture fixtures and pre-edit rollback in artifacts/portfolio-refresh/.
- Typecheck and diff check passed; desktop/mobile rendered seven projects with loaded previews and no horizontal overflow. No deployment.

## Personal pages release authorized - November 15, 2026
Final production build, TypeScript and all 21 tests passed. User approved release of portrait navigation, About/Resume/editorial gallery, transparent Start header and updated project selection. Preserve production 564dbf3 rollback before main push. No backend/inquiry behavior or theme artwork changes. Live verification pending.

## Personal pages live verification - November 15, 2026
- Deployed main 6fac086 via webhook/Coolify 1nyhfbzg9p0hg1wnrlk46ugw, finished 09:32:37 UTC; prior 564dbf3 rollback pushed.
- Live routes/health/www/legacy redirect, exact PDF and three gallery image hashes passed. Desktop/mobile menu/page/referral flows, all-theme transparent Start header and seven loaded projects verified in browser. No email submitted. Evidence in artifacts/personal-pages-release/.
- Release includes binary PDF Git attribute and trailing-whitespace cleanup; no application behavior changed after final production build.

## 2026-11-15 - Local portfolio organization and preview experiment
- Preserved rollback/before-portfolio-sections-20261115 at 6fac086 plus pre-edit files/docs in artifacts/portfolio-sections/.
- Added Work, nested In development (CloseDesk/Grantstead), and Personal (Main Hub/Coming soon Blog). Retained existing artwork and concise captions.
- Added native image preview dialog, external site links, and on-demand desktop Hub iframe. Other sites deny framing; no remote security/config changes. Mobile has image/Visit site fallback; iframe unmounts on resize/close.
- Fixed Strict Mode dialog cleanup issue found during browser testing. Escape/backdrop close, focus restoration, actual embedded Hub navigation, 320/390px fit and theme materials checked.
- 21 tests, typecheck and production build passed. Local preview http://localhost:3096/portfolio. No push or deployment.

## Local interactive portfolio previews - November 15, 2026
User authorized restricted embedding changes across the linked sites, local interactive previews, clearer section labels, and a stable gear position. LOCAL ONLY: no commit, push or deployment. This supersedes the earlier Hub-only/mobile-image preview restriction for this local pass.
Rollback: artifacts/interactive-previews/before-interactive.zip preserves the previous local gallery/docs. The three global stylesheets have separate pre-gear backups there. Existing rollback/before-portfolio-sections-20261115 remains at 6fac086.
All eight available projects now open a real iframe in a native modal on desktop/mobile, with fixed close/Open site/image controls. Frames unmount on close or image switch. Sandbox permits scripts, same-origin behavior and new tabs but omits forms, downloads and top-navigation privileges; JS-driven actions may still exist, so the UI directs sign-in/forms to the full site. No forms were submitted. Blog remains Coming soon.
Only public allowlisted paths in six isolated companion worktrees are prepared for embedding from https://edsong.xyz and https://www.edsong.xyz. Private/API/unknown routes retain DENY. Development adds exact localhost:3096/127.0.0.1:3096 parents. Hub already allows framing. See C:/Users/edwar/Desktop/ACTIVE PROJECTS/portfolio-embedding-local/REVIEW.md for paths and validation. No active companion checkout was modified.
Local review: PORTFOLIO_LOCAL_PREVIEWS=1 with NODE_ENV=development maps projects to ports 3191-3196; production always uses real URLs. TROA uses public /v3 implementation routes locally. Keep companion servers running while reviewing. Live companion production framing still blocks previews until a separately authorized coordinated release.
Work/Personal use numbered vertical side labels at >=1280px, horizontal rules on smaller screens; In development has its own divider. Gear now uses one fixed position on every route, and stable root scrollbar gutter prevents short/long page horizontal shifts. Header artwork/transparency and theme colors unchanged.
Validation: 21 tests, typecheck, production build passed (standalone build required normal host filesystem access after sandbox EPERM). Browser verified all eight preview pages across this pass; actual FTN navigation to Resources and CloseDesk Product/Questions/FAQ expansion and scrolling; 390px and 320px modal fit, image fallback, frame cleanup, Escape/close and opener-focus return. Gear coordinates identical across home/about/portfolio/resume/start at desktop and 390px. No physical phone/WebKit check. Evidence: artifacts/interactive-previews/.

## Live-only preview simplification - November 15, 2026
Removed modal image mode and Back to image/Explore live toggle at user request. Gallery thumbnails remain unchanged; modal always loads the live iframe with Open site and Close controls. Existing sandbox, loading state, focus behavior and companion framing worktrees preserved. Rollback files: artifacts/interactive-previews/*before-live-only*. Local only; no deployment.
Validation: 21 tests, typecheck and production build passed; browser verified live content with no modal image or image-toggle controls. Nothing pushed or deployed.

## Lean UI and copy refinement - November 15, 2026
User approved the audit recommendations as a LOCAL ONLY pass. Rollback: artifacts/lean-refinement/before-refinement.zip preserves all src files and repository docs immediately before this pass. Nothing pushed or deployed; companion embedding worktrees remain unchanged and require their documented release checks.
Modal now has one compact title bar with named 44px external-link and Close controls. Removed type subtitle, action row, Live preview label and instructional footer. Native dialog, iframe sandbox/loading/unmount, Escape/backdrop dismissal and focus restoration remain. Explicit initial Close focus avoids the external link taking focus. Measured modal overhead at 390px: ~58px versus ~183px before.
Each project uses one anchor around thumbnail and caption: ordinary clicks open its live modal, modified clicks retain direct external navigation. Removed Preview badges and external-arrow ambiguity. Personal has a compact nonlinked Blog / Coming soon row. Portfolio has one closing Start a project CTA; optional footerContact prop hides its duplicate footer CTA only on that page. Other pages retain their footer navigation. Headline, home navigation policy, artwork and gallery screenshots preserved.
About now has three short factual paragraphs. Web resume has a one-sentence summary, plain PDF download, no redundant section index, shorter experience bullets and project descriptions. Dates, role labels, counts and outcome qualifications retained. Original PDF unchanged: SHA256 83425832B4466444163EC3B97B1CF96492BF073E06C8F8D041E7B3C5126E09CA.
Matcha reply reassurance uses dark #263d2c text on opaque pale #faf7e9 locally behind the text so scenery cannot reduce contrast. No artwork files changed.
Validation: 21 tests, typecheck, production build and diff check passed. React review: no added dependencies, no iframe loaded before opening, no nested anchors, one project focus target, named 44px controls, explicit close focus and opener-focus return. Browser reviewed desktop About/Resume and compact modal, 390px form/About/Resume/portfolio, and 320px long-title toolbar with no horizontal overflow. Verified caption click opens matching project, Escape restores opener and removes iframe; portfolio has one contact CTA and one Coming soon label. No forms submitted; no physical phone/WebKit check. Screenshots under artifacts/lean-refinement/. Local preview remains http://localhost:3096/portfolio.

## Custom themed navigation - November 15, 2026
User requested custom circle-menu icons/materials and any necessary audit refinements, LOCAL ONLY. Rollback: artifacts/themed-navigation/before-themed-navigation.zip includes source/docs immediately before this pass. No deployment, push or companion-repository changes.
Added PortraitMenuIcon with fifteen original inline SVG drawings: Default clean person/grid/document; Tokyo framed identity, illuminated panels, digital document; TRON faceted person, connected modules, circuit document; Noir cameo/gallery/engraved page; Matcha brush portrait, folding art panels and scroll. One SVG per destination with CSS-selected theme groups avoids async image loading, theme subscriptions and hydration replacement. Shared labels, positions, semantics, mobile list and tap areas preserved. No dependencies or artwork files added/changed.
Desktop circles now use theme-specific materials (Tokyo dark neon rim, TRON recessed light rings, Noir silver finish, Matcha pale paper); hover changes are brief and respect reduced motion. No continuous menu animation. Forced-colors fallback preserves system colors. Added desktop current-page underline to complement existing mobile current-page background.
Audit follow-up: portrait now has a small closed-state chevron cue that changes to X when open. Internal mobile-menu arrows are chevrons; About and footer internal links use forward arrows rather than external-link arrows. No extra homepage text, section or call to action. Existing headline, artwork, portfolio organization, short copy and compact live previews retained.
Validation: 21 tests, typecheck, production build and diff check pass. Browser reviewed desktop themed surfaces and mobile Default/Noir lists, all five icon families at 320px (exactly three visible drawings, no overflow), 52px mobile targets, arrow-key focus movement, Escape trigger-focus return, correct Resume current-page marker, navigation dismissal and preserved referral query on Start. OS reduced-motion/forced-color fallbacks reviewed in source; not toggled in browser. No physical-device/WebKit testing or forms submitted. Evidence: artifacts/themed-navigation/*.jpg. Local review: http://localhost:3096/.

## Approved portfolio release - November 15, 2026
Edward authorized the final reviewed portfolio/navigation/copy refinements, simple Blog coming-soon image, and coordinated restricted companion embedding release after desktop/mobile checks. This supersedes the preceding local-only restrictions for this release. Preserve the artwork, headline, hidden duplicate homepage work link and existing inquiry behavior.
Final local validation: 21 tests, typecheck, production build and diff check passed. Desktop and measured 390px review confirmed loaded gallery images, noninteractive Blog placeholder, readable About/Resume/form, no horizontal overflow and working navigation. Prior 320px/all-theme/menu/iframe interaction checks remain applicable. Original resume PDF is unchanged. No inquiry or companion forms submitted; no physical-device/WebKit certification.
Rollback: rollback/before-portfolio-sections-20261115 at 6fac086, plus local artifacts/themed-navigation/before-themed-navigation.zip. Companion changes are isolated public-path frame policies for exact edsong.xyz/www.edsong.xyz parents; all private/API/unknown routes retain denial. See portfolio-embedding-local/REVIEW.md for companion source/checks. Production uses real preview destinations regardless of PORTFOLIO_LOCAL_PREVIEWS. Publishing only after companion release verification.

## Verified portfolio release - November 15, 2026
Production source: 2ac9a524baf126cd3a36539dd605946de05c0cde. Signed webhook deployment nzlychckjqgn8m1e45apttcq finished 18:55:50 UTC. Rollback/before-portfolio-sections-20261115 is published at 6fac086.
Released the reviewed work/development/personal sections, compact live-only modals, concise About/Resume copy, fixed gear placement, custom themed menu icons/materials, Matcha reply-note contrast, Main Hub and original paper-style Blog coming-soon SVG. Artwork/headline and hidden duplicate homepage work link remain as reviewed. Blog has no link or preview action.
All six companion policies are live; 27 public/private HTTP checks pass. All eight real project iframes rendered in the production browser. CloseDesk Questions navigation, accordion expansion and internal scrolling passed; 390px modal fit, Escape/unmount/opener-focus restoration, mobile menu and blog image passed. Browser automation could not click some cross-origin frame targets directly; normal keyboard input successfully verified their navigation and interaction. No application workaround was added.
Home/About/Resume/Portfolio/Start/health and www return 200; blog SVG is served; exact resume PDF SHA remains 83425832B4466444163EC3B97B1CF96492BF073E06C8F8D041E7B3C5126E09CA. Old contact portfolio redirects retain referral parameters. Production HTML contains no local preview destinations or personal recipient address. Generic Python client requests were blocked at the edge; explicitly identified verification requests and browser/curl passed without changing security settings.
Evidence: artifacts/final-portfolio-release/{http-results.json,live-desktop.png,live-mobile.png}; companion release record: portfolio-embedding-local/REVIEW.md. Source checks: 21 tests, typecheck, production build. No inquiry or private forms submitted and no physical-device/WebKit certification. Release documentation is pushed on docs/portfolio-release-20261115; production remains the verified source above.


## Local graphic novel Silver Noir - November 15, 2026
User approved replacing the particle experiment with restrained graphic novel noir, then clarified DARK and dramatic with striking accents: the visual language of high-contrast noir comics, without their characters or recognizable scenes. LOCAL ONLY; no push/deploy. Other themes, page copy, headline, portfolio visibility/navigation, inquiry behavior and existing artwork are preserved.
Rollback: rollback/before-graphic-noir-20261115 points to b1b0838. The exact uncommitted particle experiment and source/docs are preserved separately in artifacts/noir-graphic/before-graphic-noir.zip (the branch alone does not include those uncommitted changes). Earlier artifacts/noir-particles/before-particles.zip also remains.
Removed NoirTitleSmoke from the homepage and deleted the obsolete React capture/iframe component and fluid CSS. Text is ordinary semantic DOM at all times, with no pointer capture, source rasterization or replacement. Upstream public fluid assets remain dormant and unchanged, including their MIT notice; nothing in src references or loads them.
Original desktop/phone noir artwork generated with the built-in image tool; optimized WebP files: public/themes/noir-graphic.webp (248216 bytes, 1536x1024) and noir-graphic-mobile.webp (120724 bytes, 820x1640). Final prompts and provenance: artifacts/noir-graphic/art-direction.txt. Original PNGs remain in the generated_images folder. Mobile was recomposed with the window/building below the headline; tablets preserve its proportions and feather the art into charcoal rather than enlarging the bright roof through the copy.
Palette: silver type, charcoal ink, selective crimson headline/button/window. Original headline and normal Noir font metrics retained. Ink menu surfaces, matching swatch, readable bare gear, subtle header-edge shading with no line, and subdued footer contrast protection. Reading pages retain their quiet existing treatment; form has an ink veil and transparent header. A small 14-second reflected-light layer moves only on the homepage; visibility cleanup pauses hidden tabs, and reduced-motion/forced-colors rules remain. No WebGL or particle animation loads.
Validation: 21 tests, typecheck and production build passed. Browser visually reviewed 1440x1000 and 1024x768 desktop/landscape, 768x1024 tablet, 390x844 and 320x700 mobile, desktop/mobile menus, settings/theme switching, Resume and the final mobile Start form. No horizontal overflow, no decorative iframes, no browser error/warning logs; form/reading motion is paused. Default remains visually unchanged. React review: no dependencies, per-frame state or effects added; visibility listener cleans up, decoration is aria-hidden/pointer-transparent, removed effect no longer adds client capture work. OS reduced-motion and forced-colors paths reviewed in source, not OS-toggled; no physical phone/WebKit claim and no inquiry submitted. Evidence: artifacts/noir-graphic/{desktop-final.png,mobile-final.png,form-mobile.png}. Local preview: http://localhost:3096/ with Silver Noir selected. Production remains 2ac9a52.


## Local Crimson Noir motion - November 15, 2026
User approved subtle animated rain and moving red window reflections, requested a better theme name, and explicitly prohibited deployment. Display name is now Crimson Noir; the stored `noir` key is unchanged so existing preferences remain valid. Artwork, headline/layout, other themes, portfolio and inquiry behavior are preserved.
Exact pre-motion rollback: artifacts/noir-motion/before-noir-motion.zip (source, artwork and repository guidance including all local graphic-novel changes). Prior graphic/particle snapshots remain.
Replaced the broad CSS reflection sweep with createNoirMotion in the existing shared canvas renderer. Rain uses 38 mobile / 72 desktop fine strokes, heavily attenuated in the reading area and around controls. Reflection motion samples only the painted red pavement region into a cached feathered texture, then shifts 18 shallow bands by at most a few pixels. No new art or dependencies, pointer interaction, WebGL, text manipulation, image readback or additional animation loop. Noir paints at approximately 30fps; DPR remains capped by the shared renderer. Image requests are lazy/cached, callbacks are detached on disposal, and the renderer clears on route/theme changes. Existing hidden-tab and reduced-motion guards stop it; form and reading pages do not start it. Removed the now-unneeded CSS-animation visibility listener.
noir-layout.ts mirrors proportional cover crops and the height-fit tablet artwork; its two tests verify bottom anchoring, reflection confinement, tablet alignment and CSS viewport breakpoints despite scrollbar gutters. Validation: all 23 tests, typecheck, production build and diff check pass. The sandbox initially blocked standalone build-directory writes; the same local build completed with the allowed build escalation. No production action.
Browser review: desktop and 390px mobile home, renamed setting, clean browser warning/error log, no overflow, no decorative iframe and unchanged mobile heading geometry. Sequential screenshot comparison confirms restrained movement in the rain and reflection regions. Form cleanup/static rendering and return navigation checked. OS reduced-motion/hidden-tab guards reviewed in source; no claim of physical-device or WebKit testing. Evidence is under artifacts/noir-motion/. Preview remains http://localhost:3096/ with Crimson Noir selected. Production remains 2ac9a52.


## Local Tokyo identity, TRON lighting, Matcha breeze - November 15, 2026
User approved a distinctive Tokyo setting, coordinated TRON lighting and a restrained increase in Matcha leaves. Later reported a rectangular blur outside the settings dropdown; fixed within this same local pass. No deployment authorized. Exact starting rollback: artifacts/theme-identity/before-theme-identity.zip. Preserve the prior Crimson Noir work, headline, copy, portfolio policy and inquiry contracts.
Tokyo now uses original painterly rooftop/side-street artwork, a distinctive amber-disc sign, plum-lit facades, warm window, overhead cables and wet rooftop. Desktop composition deliberately moves both light sources inward for cropping. Separate tall mobile composition preserves them around the reading area. New optimized assets: public/themes/tokyo-rooftop.webp (1672x941, 210474 bytes) and tokyo-rooftop-mobile.webp (820x1640, 96148 bytes). Existing Tokyo assets remain untouched. Built-in image generation prompts/provenance: artifacts/theme-identity/tokyo-prompts.txt. Amber CTA/headline accent replaces pink while retaining plum scene/menu materials. Lighting is re-registered to the new artwork: sign illumination and reflection share a slow rhythm, a gentle occasional dip, two fine window rivulets and an occasional small passing street light. Updated cinematic sceneLayout portrait dimensions; TRON and garden dimensions stay unchanged.
TRON keeps its exact artwork and paths. Added a 15-second coordinated circuit: overhead feeds the walls, walls converge at the horizon, then the floor carries the signal forward. Existing trail rendering supplies matching reflection and mobile foreground fade. Sequential subtle wall sections are bounded by existing top/floor rails, with pauses after the larger sequence. Pointer-triggered signals remain. Clamp trail alpha to a valid range.
Matcha keeps its artwork. Releases two staggered leaves per breeze (occasionally three on desktop), then quiet gaps of 16-22 seconds between breeze starts. Variation in size, duration, start/landing positions and a shared small drift; existing canopy interaction and pond ripples retained. Hard cap 3 phone / 4 desktop leaves. A 60-second source-render simulation observed maximum 2 on phone / 3 desktop and about 24-29 seconds without leaves; all TRON drawing coordinates remained finite over a full cycle. No independent animation loops or dependencies added; existing hidden-tab/reduced-motion/route guards remain.
Settings fix: removed backdrop-filter from the animated dropdown itself; its tinted gradient now has an opaque surface underlay. Rounded edges, compact layout, soft shadow, keyboard focus and animation remain, without external blur or headline ghosting through the panel. Confirmed computed backdrop-filter:none and visually checked desktop/mobile edges.
Validation: 23 tests, typecheck and production build passed; diff check clean. Browser reviewed desktop/phone Tokyo/TRON/Matcha, canopy interaction, theme switching, the new dropdown, and Tokyo Start readability; no horizontal overflow or error/warning logs. Browser zoom affected nominal viewport dimensions on some captures; measured phone examples included 355 CSS pixels and 390 CSS pixels. No physical-device/WebKit testing, no OS-toggle verification, and no inquiry submitted. Screenshots under artifacts/theme-identity/. Local preview http://localhost:3096/. Production remains 2ac9a52; no push or deploy.

## Local Tokyo cityscape and Korean garden - November 15, 2026
User authorized reimagining both backgrounds from scratch, then clarified that mountains/buildings must not float and the Korean structure must stay visible as the screen narrows without obstructing central content. LOCAL ONLY. Exact pre-change snapshot: artifacts/city-korea/before-city-korea.zip, containing source, artwork, tests and repo guidance with all prior uncommitted refinements. Production remains 2ac9a52; no push or deployment.

Generated original desktop/phone Tokyo cityscapes and Korean ink/mineral-pigment gardens with the built-in image tool. Iterated on the user's feedback: removed isolated upper mountains, made the pavilion larger/inset, extended the phone city towers continuously into the lower skyline, and added a dedicated tablet garden composition to keep the roof below the homepage button. Originals and earlier assets remain. Final WebP assets: tokyo-cityscape.webp (1672x941, 240330 bytes), tokyo-cityscape-mobile.webp (820x1640, 193232 bytes), matcha-hanok.webp (1672x941, 175308 bytes), matcha-hanok-mobile.webp (820x1640, 150612 bytes), matcha-hanok-tablet.webp (1200x900, 110916 bytes). Prompts, source filenames and corrections are in artifacts/city-korea/art-direction.txt and art-corrections.txt.

Garden uses the wide asset above 4/3, tablet asset from >3/5 through 4/3, and phone asset at <=3/5. All scale proportionally with bottom anchoring; horizontal anchor is 60% wide/tablet and right on phones. The canvas projection uses the CSS viewport width for media-query selection while retaining actual canvas bounds for scaling, accounting for the reserved scrollbar. Added an artwork-bounds regression test for complete pavilion visibility across representative phone/tablet/narrow-desktop/wide viewports.

Extracted Tokyo into createTokyoMotion in the existing shared renderer: two small intermittent railway light trails, restrained rooftop beacons and rain attenuated through the reading area. Removed obsolete rooftop-disc/window/rivulet/puddle effects. Matcha retains bounded staggered leaf groups, with ochre pigment and source-aligned starts/landings beside the pavilion; pond clipping follows the new stone bank. Same shared loop, DPR cap, reduced-motion/hidden-tab/route cleanup; no new dependencies, input interception or per-frame React updates. Existing art/copy/headline, portfolio policy, inquiry behavior, TRON, Crimson Noir and dropdown blur fix remain.

Validation: 24 tests, typecheck and production build passed; diff check clean. Browser reviewed 1440x1000 desktop, 1100x1000 narrow desktop, 768x1024 tablet, 390x844 phone and 320x700 small phone. Full pavilion remains visible in the reviewed homepage compositions; phone forms keep readable content and white navigation controls. Tokyo's connected city, phone/desktop compositions, theme switching and settings panel checked; computed backdrop-filter is none and the external blur is absent. No horizontal overflow or current browser error/warning logs. Pond tap checked without navigation/input interference; motion guards reviewed in source, not OS-toggled. No inquiry submitted and no physical-device/WebKit certification. Screenshots: artifacts/city-korea/*.jpg. Preview: http://localhost:3096/, Matcha selected, viewport override reset.

## Local concise resume - November 15, 2026
User requested a purpose-built website resume instead of the profile PDF's full content: jobs/positions timeline, earlier experience, selective skills/stack and Korean/English; remove PDF download, work descriptions, selected-work duplication, education and leadership material. Implemented locally only. No changes to final-profile, inquiry/routing, portfolio, themes or artwork. Production remains 2ac9a52; no push/deploy.

Exact rollback: artifacts/resume-concise/before-resume-concise.zip includes the prior source, source PDF and repository guidance. Removed the PDF link and its unused styles; the original asset and existing legacy profile redirect remain untouched. Role titles, month/year ranges, organizations, volunteer/contract context and earlier-experience range are retained from the existing verified resume. Cross-checked current role labels against final-profile's PortfolioZen.tsx. No new outcomes, seniority titles or language proficiency claims.

The page now contains only the name/header, an ordered career timeline with four entries (three roles and earlier fields), three expertise areas, a short selected-stack line and Korean/English. Expertise emphasizes system/product architecture, full-stack integration and operating reliable infrastructure. Stack is limited to TypeScript, React/Next.js, PHP, SQL and Docker. Open two-column desktop layout uses a continuous fine career rail; mobile stacks dates/roles without the indent, followed by expertise and languages. Removed numbered section markers and repeated bio/location/job-title summary. Shared header, menu, footer contact link and referral handling remain.

Validation: 24 existing tests, typecheck and production build passed. No new tests added for this content/layout change. Browser verified Default, Matcha and Crimson Noir, desktop and compact desktop, 390px phone, and a narrow viewport measuring 291 CSS pixels under browser zoom. No horizontal overflow, no PDF/download anchor, and removed sections absent from the accessible page. Narrow-view gear remains inside the viewport. Screenshots: artifacts/resume-concise/. No form submissions or physical-device/WebKit testing. Local preview: http://localhost:3096/resume.

## Resume wording follow-up - November 15, 2026
User asked to remove Volunteer from the resume CTO entry and clarified that Ryu Legal is not their only contract. Removed only the resume qualifier locally. Broader independent/contract positioning and replacing the generic expertise/stack with concise scope plus sector labels are under discussion; do not infer an independent-practice start date from the Ryu Legal contract date. No push/deploy. Existing concise-resume rollback retains the old label.

## Local resume positioning approved - November 15, 2026
User approved the proposed technical-focus/sector direction and confirmed independent engineering and consulting started in August 2022 with Ryu Legal. Requested no client names in the broader timeline entry because the portfolio already supplies that context. Changed the role to Independent Engineering & Consulting, Aug 2022 — Present, without an organization/client subline or redundant Contract label. CTO remains unqualified; Product Lead and earlier experience are unchanged.

Replaced generic expertise descriptions and the selected stack with Focus (Technical direction & architecture; Product engineering & integrations; Infrastructure, security & reliability) and Areas of work (Health tech; Legal tech; Nonprofit technology; Games & interactive systems). Retained Korean/English. Removed obsolete kind/stack/definition-list styles and conditional empty organization markup. Same open timeline and responsive sidebar; no added badges, cards, links or description paragraphs. About, portfolio, profile site, artwork, routing and inquiry behavior unchanged.

Rollback: artifacts/resume-positioning/before-resume-positioning.zip contains the preceding resume/CSS and repository guidance. Validation: 24 tests, typecheck and production build passed; diff check clean. Browser verified desktop composition, mobile two-line title, all focus/sector/language content, no PDF/client/stack content in the resume, no horizontal overflow at measured 390px, and no current browser warnings/errors. Viewport override reset and local resume left open. Evidence: artifacts/resume-positioning/{desktop.jpg,mobile.jpg}. No physical-device/WebKit certification. Local preview http://localhost:3096/resume. No push or deploy; production remains 2ac9a52.

## Transparent headers and portrait captions - November 15, 2026
Implemented user-requested local refinement: removed inner-page header paint, leaving transparent headers on home, start, about, portfolio and resume, including scroll states. Added compact opaque theme-matched desktop captions on hover/focus, with Resume placed beside its circle; mobile list labels and 52px targets remain. Kept accessible names, menu animation, reduced-motion and forced-colors rules, shared header positions, artwork/content and inquiry behavior. Small glyph-level contrast shadows support Matcha reading controls without adding a bar or gear backing.

Rollback: artifacts/transparent-header/before-transparent-header.zip. Checked desktop labels in all five themes, all route header styles, keyboard traversal/Escape/navigation, scrolled gallery, 390px Matcha and 320px Crimson Noir mobile layouts; no overflow or current console warnings/errors. Existing 24 tests, typecheck, production build and diff check passed. No new CSS-mirroring tests; OS accessibility modes and physical devices not exercised. Evidence under artifacts/transparent-header/. Local preview left open at http://localhost:3096/portfolio with viewport override reset. No commit, push or deployment.

November 15 caption consistency: removed one desktop underline rule. Verified in local browser on /portfolio that all three labels have text-decoration:none and current-page semantics remain. Screenshot: artifacts/transparent-header/caption-no-underline.jpg. No test/build rerun for this one-rule cosmetic deletion; diff check passed. No push/deploy.

## About copy - November 15, 2026
Rewrote the About introduction at the user's request: CTO without Volunteer, broader independent work for businesses/nonprofits instead of naming Ryu Legal, a short account of the teaching/comedy-writing/legal-operations background, and verified personal interests. Kept the existing image and navigation/layout. Facts sourced from the current local professional-profile components; no edits to that repository. Rollback: artifacts/about-copy/before-about-copy.zip. Typecheck/diff check passed; desktop and 390px mobile browser review found no overflow or current console errors/warnings. Evidence: artifacts/about-copy/{desktop.jpg,mobile.jpg}. No tests added or functional suite/build rerun for prose only. Local preview http://localhost:3096/about. No push/deploy.

## Five-item menu, themed veil, current marker, Back - November 15, 2026
Implemented the approved local navigation refinement and two mid-pass additions. Added Home and Contact with theme-specific SVG icons; revised desktop geometry to a spaced quarter-circle and retained labeled mobile rows with short-viewport scrolling. Added themed temporary page veils and current-page check markers without restoring caption underlines. Kept the header transparent, main CTA, original artwork/content and hidden duplicate home work link. Matcha form controls change to dark ink only while its pale veil is open.

Replaced the header Home link on inner pages with shared BackLink and entry-specific same-origin history tracking. Preserved Next history fields, normal native traversal/reload, referral context and a home fallback for direct/unknown entries. Browser testing exposed a native fragment entry with null state; fixed it by remembering only the last committed entry and accounting for hash entries before the router's replace operation. Added a regression case, then verified Skip to content -> Back returns to the previous page. No server/API/inquiry changes or external side effects.

Rollback: artifacts/five-item-menu/before-five-item-menu.zip and ROLLBACK.txt. 32 tests, typecheck, production build and diff check passed. Reviewed desktop all themes, current markers and tooltips, mobile 390/320px, short 640x320 menu scrolling, outside dismissal, keyboard navigation, sequential Back, Forward/reload, repeat Back after Forward, native hash skipping, direct arrival fallback and referral propagation. No current browser console warnings/errors. React review applied; OS accessibility modes and physical/WebKit devices not tested. Proof images: artifacts/five-item-menu/*.jpg. Preview left locally at http://localhost:3096/start with menu open; no commit, push or deploy.

## Approved experience release - November 15, 2026
Edward authorized deployment of the complete reviewed local state with "if good deploy". This supersedes the local-only restrictions for Crimson Noir, Tokyo/Matcha artwork, coordinated motion, transparent headers, concise About/Resume, five-item portrait navigation, themed current-page markers/veils and safe Back behavior. Preserve the current headline, original/rollback artwork, hidden duplicate homepage work link, inquiry handling, referral forwarding, companion framing and all runtime secrets. Final local verification: 32 tests, typecheck, production build and diff check passed; desktop, 320/390px mobile and short-viewport navigation were exercised. Production before release: 2ac9a524baf126cd3a36539dd605946de05c0cde. Keep its Coolify image and remote rollback/before-themed-navigation-release-20261115. Existing local snapshots remain under artifacts/.

## Verified production release - November 15, 2026
Released application commit 6a7c978fca7f76421eb02e8d1e07cce37deea10d to GitHub main. Signed webhook started personal Coolify deployment z3wxw2vhnkfe8phancufhwuh; finished successfully 2026-11-15 22:16:47 UTC. Application running:healthy, zero restarts, current image matches release SHA. Prior image 2ac9a524baf126cd3a36539dd605946de05c0cde remains available and remote rollback/before-themed-navigation-release-20261115 preserves that source. All local rollback archives remain intact.
Live verification: apex, www and /api/health return 200; legacy contact /start retains path/referral in 308 redirect. Actual browser verified five navigation destinations, revised About/Resume content, Home/Contact current-page checks, menu dismissal, About -> Work -> Contact -> Back -> Work -> Back -> About, reload then Back, and direct-entry Back fallback with referral retained. Viewed all five themes; measured 390px Matcha and 320px TRON have no horizontal overflow. Default headline/layout retained, mobile list and desktop circles working, gear/Back readable. No browser warning/error after deployment completion. The tab opened during rollout logged one old-chunk load error before completion; reload resolved it and all subsequent checks were clean. No inquiry submitted, no companion changes, no physical-device/WebKit certification. Viewport restored. Evidence: artifacts/five-item-release/live-desktop.jpg and live-mobile.jpg. Release record is docs-only; main remains the verified application SHA.
