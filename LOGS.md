# Work log

## 2026-11-13 — separate selected-work gallery

- Edward asked for a client-facing portfolio at contact.edsong.xyz/portfolio, keeping his main profile separate, then broadened the choice of work and requested a rethink from scratch.
- Added a restrained screenshot-led gallery featuring Find the Next 6,000, Ryu Legal, TROA, MyWord, and QFin Games. Captured their current public homepages; no private dashboard or real message content is used. Volunteer and alpha/private-pilot context is explicit.
- Changed the homepage wordmark to this site's home and My work to /portfolio. Preserved normalized referral context through the gallery and inquiry links. Added portfolio metadata and sitemap entry; the existing form and mail delivery code are unchanged.
- All 11 tests, TypeScript checking, and the optimized production build passed. Browser review covered desktop and an observed 390 CSS-pixel layout with no horizontal overflow, loaded project previews, accessible project headings/links, homepage-to-gallery-to-form navigation, sanitized referral propagation, and no public recipient address or browser warnings/errors. No email was sent. The production client bundle scan found no fixed recipient address or mailto link. Production release is pending.

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
