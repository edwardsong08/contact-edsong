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
- Run npm test, npm run typecheck, and npm run build for functional changes.
- Deploy production from main through personal Coolify in Edward Song / production. Never store credentials or webhook secrets in the repository.
- Update CONTEXT.md and LOGS.md when architecture, deployments, or pending work change.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
