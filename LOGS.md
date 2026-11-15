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
