# Contact Edward Song

Read CONTEXT.md and LOGS.md before making changes. This is Edward's personal inquiry site, independent of TROA and QFIN.

- Canonical host is https://edsong.xyz. profile.edsong.xyz hosts the separate professional profile. Keep permanent old-contact page redirects with paths and referral parameters intact. Keep /api/deploy and /api/inquiry available on the legacy contact hostname so existing hooks and open forms continue working.
- Serve both edsong.xyz and www.edsong.xyz without redirects between them. The previous profile sent a permanent apex-to-www redirect; reversing it causes loops for returning visitors with cached redirects. Canonical metadata remains on apex. The focused /?refresh=20261113 URL clears only this origin's HTTP cache to recover browsers that cached both directions during cutover.

- Use Next.js App Router and TypeScript. Read relevant installed Next.js documentation in node_modules/next/dist/docs before changing framework behavior.
- Keep the recipient in server-only src/lib/send-inquiry.ts. Inquiries go to edwardsong08@gmail.com; never display or bundle that personal recipient address in the public frontend. Edward explicitly requested its removal from the page.
- Preserve the deliberately minimal homepage: system typography, generous space, short copy, and one blue Start a project CTA. Edward explicitly rejected the longer page, mockups, service sections, FAQ, and brief builder as bloated.
- Edward approved deploying the typography/form refinement after local review. Keep the existing headline, stronger plain-text wordmark, clear internal arrows, and short three-field form. His final homepage description is "Websites and web apps. From landing pages to complete platforms." This shorter description supersedes the first-person draft; the portfolio link remains hidden.
- /portfolio is the separate client-facing work gallery. Keep profile.edsong.xyz separate. Edward wants each entry formatted as Name | Type, using his supplied types: Find the Next 6,000 and TROA are Nonprofit, MyWord is Open source, QFin Games is Independent game studio, and Ryu Legal is Law firm. No taglines, descriptive paragraphs, or extra metadata rows. Use real public previews, keep project links and Back navigation, and do not add resume sections, invented outcomes, or private dashboards. Preserve sanitized referral context between home, work, and the inquiry form.
- My work navigation is temporarily hidden at Edward's request. Keep SHOW_PORTFOLIO_LINK false until he asks to restore it. Preserve /portfolio, its assets, and direct/legacy links; only home and Start a project are promoted.
- The main CTA leads to /start, a matching short form with name, email, and message. LinkedIn was deliberately removed. Success may be shown only after the mail provider accepts delivery.
- Keep the explicit portfolio Back link and useful 404 recovery. Form markup must retain a same-site POST action and disabled controls until hydration, so JavaScript failure cannot turn an inquiry into URL query data. Keep text, input borders, hover states, and focus indicators readable.
- Inquiries go only to edwardsong08@gmail.com. Keep RESEND_API_KEY runtime-only and server-only; use the visitor email as Reply-To, never as From. Preserve validation, payload limits, rate limits, honeypot, and idempotent retries.
- The deployment webhook is server-only. Keep signature validation, repository/branch restrictions, size limits, and generic errors. Never expose the private Coolify target or secret to client code.
- Do not invent clients, testimonials, prices, delivery guarantees, or availability.
- Preserve keyboard access, visible focus, responsive layouts, and reduced motion support.
- Current local direction: Default, Tokyo Midnight, TRON, Silver Noir, and Matcha Garden have distinct art direction and restrained theme-specific interaction. Keep drawing; the blob toy was explicitly rejected and removed. Keep the current headline and omit the Independent design & development eyebrow. Default uses the deployed grey second headline line (superseding the blue accent); alternate themes retain their accents. Settings has a bare 44px gear matching the portrait, only theme names/previews, and an animated Doodle switch. These changes are local review only until Edward authorizes deployment.
- Run npm test, npm run typecheck, and npm run build for functional changes.
- Deploy production from main through personal Coolify in Edward Song / production. Never store credentials or webhook secrets in the repository.
- Update CONTEXT.md and LOGS.md when architecture, deployments, or pending work change.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
- Theme scenes replace cursor spotlights: Tokyo city/rain, TRON traveling lights, Silver Noir fluid text dispersion, and Matcha illustrated garden. Keep the semantic headline readable. No deployment authorized.
- Silver Noir now uses the actual profile fluid solver with a headline source texture, not a smoke emitter. Preserve the upstream MIT notice, static semantic text fallback, idle pause, and the narrowly scoped same-origin iframe policy. Tokyo/Matcha use custom WebP artwork; TRON uses a perspective arena. Local review only.
- Motion is now intrinsic to each theme: no Motion toggle or saved motion preference. Always respect OS reduced-motion, pause hidden/inactive scenes, and keep animation off the form. Matcha canopy/pond interactions must never intercept links, inputs, or Doodle.

- Silver Noir should feel like charcoal and soft silver, not a flat black page. No decorative header/footer frame lines. Preserve the normal Noir headline typography during dispersion; use browser-laid-out source capture rather than approximating and stretching individual words.

- TRON direction: preserve the cinematic light-wall composition Edward liked; use original edited desktop/portrait artwork without bikes or tower silhouettes. Do not replace it with simple abstract CSS lines, curvy sculptural worlds, or dense busy architecture. More motion should follow the actual light walls, edge structures and reflections. Silver Noir static-to-interactive typography must remain aligned even after switching themes.

- Release authorization (November 14, 2026): Edward explicitly approved fixing responsive artwork scaling, checking mobile interactions, then pushing/deploying the complete refined theme experience. This supersedes the earlier local-only restrictions for this release. Preserve the artwork, hidden portfolio, exact Noir typography, reduced-motion fallback and existing inquiry/routing contracts. Scenes use proportional cover crops (portrait assets when width <= height), with matching coordinates in scene-layout.ts.


- Current scope (November 15, 2026): gear, mobile TRON framing and Silver Noir dissipation refinement is LOCAL ONLY. Do not push or deploy without new authorization. Preserve all artwork files and hidden portfolio. Rollback: rollback/before-detail-refinement-20261115 at 00bb13a. Tall TRON phones now use proportional width-fit/top anchoring with a faded foreground; CSS and scene-layout.ts must remain aligned, including the light/reflection mask.


- Release authorization (November 15, 2026): Edward approved deploying the reviewed gear, mobile TRON and Silver Noir refinements after successful local checks. This supersedes the preceding local-only boundary for this release. Push the preserved rollback before main; verify the deployed commit and public behavior. Preserve artwork and hidden portfolio.


- November 15 follow-up: user authorized deploying only the Matcha gear contrast change, with dark gear/back controls on the form. After that release, explore a partially traditional Korean-inspired Matcha background LOCALLY ONLY. Preserve the current artwork and a rollback; do not deploy the art experiment.


- Current LOCAL Korean Matcha experiment (November 15): user subsequently preferred less homepage color contrast, less washed-out form artwork, and WHITE back/gear controls on the form. This supersedes the dark form preference for the local experiment only. Production remains gear-only release 365d86c with dark form controls. Do not deploy the art/white-form experiment without authorization. Keep original and study artwork plus rollback/before-korean-matcha-20261115.


- November 15 release approval: user authorized deploying the reviewed Korean-influenced Matcha art, softer homepage palette, clearer form artwork and white form gear/back controls after successful local checks. This supersedes the local-only boundary for this release. Retain original/study art, hidden portfolio and rollback/before-korean-matcha-20261115 at 365d86c.

- Portrait navigation is a local-only three-placeholder circle-menu prototype. Keep Selected work disabled and SHOW_PORTFOLIO_LINK false until Edward authorizes real destinations. Preserve compact-form clearance, keyboard dismissal, crisp photo/text outside the SVG goo filter, and OS reduced-motion handling. This menu is separate from the rejected blob toy.
- November 15 portrait follow-up: remove the visible header name on home/form. Keep the portrait click/tap toggle with hover scoped to its fixed 44px button only; no ancestor-wide hover or caption hit areas. Footer identity and form Back link remain. Local review only.
- Mobile portrait navigation (November 15): at <=800px or touch-only/coarse-pointer devices use the compact themed 3-row panel with 52px tap targets. Keep circles on desktop. Do not fade or move the form heading to accommodate the menu; panel overlays content normally. Same accessible menu/state and disabled placeholders. Local only.
- November 15 personal-pages authorization supersedes disabled-placeholder instructions: portrait links now open /about, /portfolio (Selected work), /resume. Keep SHOW_PORTFOLIO_LINK false only to suppress duplicate standalone home-header work navigation. New pages are LOCAL ONLY until approved for release.
- Resume uses the verified deployed profile PDF (SHA-256 in CONTEXT.md) and an open editorial web layout, not rounded content cards. Preserve source claims/dates, quiet themed reading backgrounds, mobile stack, and exact original PDF download. Keep personal recipient email off the HTML frontend.
- Inner pages require explicit sticky Home navigation plus footer Home. Preserve referral query parameters; section anchors must clear the sticky header. Do not suppress warnings caused by browser extension DOM injection in application source.
- Current local refinement: personal pages use quiet theme artwork (.08 opacity), open About copy and gallery captions, a shorter editorial resume with 44px section links and no mobile timeline indent. Keep the exact source PDF and original artwork files.
- Inner-page header paint spans the viewport; Home/portrait are sticky and settings is fixed at the same baseline. Matcha inner controls are dark on this paper header, superseding earlier white form-control treatment for this local header design. Homepage controls remain unchanged. Keep this pass local until deployment approval.

- Start header correction: /start keeps a fully transparent header in every theme. Restrict the painted reading header and dark Matcha navigation overrides to .personal-page; Matcha form retains ivory Home/gear over its artwork. Preserve aligned controls. Local only.

- November 15 portfolio selection: user removed MyWord and added Bifrost Controller (Controller mapping), CloseDesk (Real estate workspace), and Grantstead (Grant workspace). Keep concise Name | Type captions and public product destinations. Local only until deployment approval.

- November 15 release approval: user authorized deploying the reviewed complete local experience after final checks. This supersedes local-only restrictions for portrait navigation, personal pages, editorial refinement, transparent Start header and seven-project gallery. Preserve rollback/before-portrait-menu-20261115 at 564dbf3 and verify live navigation/content after the main-branch webhook deployment.

- Current portfolio sections experiment (November 15) is LOCAL ONLY: Work contains an In development subsection for CloseDesk and Grantstead; Personal contains Main Hub and a nonlinked Coming soon Blog. Keep Name | Type captions. Thumbnail previews use a native modal; direct project links remain available. Only Main Hub currently permits the optional desktop live iframe. Do not weaken other sites' framing protections. Preserve rollback/before-portfolio-sections-20261115 at 6fac086. No push or deployment authorized for this pass.

- Current local scope: all available portfolio projects may use interactive desktop/mobile previews with restricted public-path companion framing. See latest CONTEXT.md and companion REVIEW.md. No deployment authorized. Keep gear fixed consistently across all routes and reserve root scrollbar gutter to prevent navigation shifts.

- Portfolio modals are live-only: no image mode or image toggle. Retain gallery thumbnails, Open site, Close, loading state and iframe cleanup. Local only until release approval.
- Lean local follow-up: one compact live-modal toolbar; thumbnail and title share a preview anchor; one portfolio contact CTA; compact Blog status; concise About/web resume with original PDF preserved. Keep Matcha reply note on its pale contrast backing. Preserve rollback in artifacts/lean-refinement. No deployment authorized.
- Local themed navigation: preserve the custom SVG icon families, consistent destination labels/positions, mobile list, small portrait menu cue and reduced-motion/forced-colors support. Original artwork/headline unchanged. Rollback: artifacts/themed-navigation/before-themed-navigation.zip. No deployment authorized.

## Approved portfolio release - November 15, 2026
Edward authorized the final reviewed portfolio/navigation/copy refinements, simple Blog coming-soon image, and coordinated restricted companion embedding release after desktop/mobile checks. This supersedes the preceding local-only restrictions for this release. Preserve the artwork, headline, hidden duplicate homepage work link and existing inquiry behavior.
Final local validation: 21 tests, typecheck, production build and diff check passed. Desktop and measured 390px review confirmed loaded gallery images, noninteractive Blog placeholder, readable About/Resume/form, no horizontal overflow and working navigation. Prior 320px/all-theme/menu/iframe interaction checks remain applicable. Original resume PDF is unchanged. No inquiry or companion forms submitted; no physical-device/WebKit certification.
Rollback: rollback/before-portfolio-sections-20261115 at 6fac086, plus local artifacts/themed-navigation/before-themed-navigation.zip. Companion changes are isolated public-path frame policies for exact edsong.xyz/www.edsong.xyz parents; all private/API/unknown routes retain denial. See portfolio-embedding-local/REVIEW.md for companion source/checks. Production uses real preview destinations regardless of PORTFOLIO_LOCAL_PREVIEWS. Publishing only after companion release verification.
