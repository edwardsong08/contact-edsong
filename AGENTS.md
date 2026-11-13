# Contact Edward Song

Read CONTEXT.md and LOGS.md before making changes. This is Edward's personal inquiry site, independent of TROA and QFIN.

- Use Next.js App Router and TypeScript. Read relevant installed Next.js documentation in node_modules/next/dist/docs before changing framework behavior.
- Keep contact details in src/lib/inquiry.ts. Inquiries go to edwardsong08@gmail.com.
- Preserve the deliberately minimal single-screen design: system typography, generous space, short copy, one blue email CTA, and a copy-email fallback. Edward explicitly rejected the longer page, mockups, service sections, FAQ, and brief builder as bloated.
- The contact CTA opens the visitor's email app. Never claim that this site sends or stores inquiries.
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
