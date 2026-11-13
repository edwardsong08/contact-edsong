# Project context

Personal website and web application inquiries for Edward Song at https://contact.edsong.xyz.

Edward requested an Apple-like experience and rejected the initial longer landing page as bloated. The homepage remains one focused screen: large system typography, restrained grayscale, a blue Start a project button, and a portfolio link. LinkedIn and the publicly displayed personal email/copy controls were removed at his request. The fixed recipient lives only in the server mail module, never in the public frontend.

/portfolio is a distinct client-facing gallery within this site. Edward asked to rethink it from scratch and authorized showcasing work across personal projects, TROA, and Find the Next 6000. The five selected projects are Find the Next 6,000, Ryu Legal, TROA, MyWord, and QFin Games. The gallery uses current public website screenshots, short descriptions, and external website links, with the existing Start a project form as its inquiry path. TROA is labeled volunteer work and MyWord alpha/private pilot. The homepage My work link now stays on this site; edsong.xyz and all other project sources/deployments remain separate. Gallery styles are isolated in a CSS module and introduce no client component, external runtime assets, or dependencies. See docs/portfolio.md for preview provenance.

/start contains only name, email, and message. POST /api/inquiry validates and rate limits submissions, then sends plain-text email through Resend to edwardsong08@gmail.com with the visitor as Reply-To. RESEND_API_KEY and optional INQUIRY_FROM are runtime-only settings. No inquiry database or content logging is used; inquiries are processed by Resend and retained in the recipient mailbox. Abuse counters contain only process-local salted hashes and expire after 15 minutes; the global cap is 60 attempts per hour. Provider acceptance is required before showing success, and provider idempotency keys prevent duplicate emails on retries.

Footer referrals can use https://contact.edsong.xyz/?from=client.example. The homepage and portfolio carry that context to the form; only the hostname is included in the email, with paths, query strings, and fragments removed. No client sites are edited as part of this change.

Stack: Next.js App Router, React, TypeScript, system fonts, plain CSS, standalone Docker image on port 3000. GET /api/health provides a minimal health endpoint.

GitHub cannot reach Coolify's private admin port. POST /api/deploy validates a GitHub HMAC-SHA256 signature using runtime-only DEPLOY_WEBHOOK_SECRET, allows only edwardsong08/contact-edsong main pushes, then forwards the raw signed payload to the fixed runtime-only COOLIFY_WEBHOOK_URL. The same secret is configured for the app's manual GitHub webhook in Coolify. No Coolify API token is used or exposed. The route handles ping locally, caps payloads at 2 MiB, and never returns internal service responses.

Repository and verified deployment details are recorded in LOGS.md. No third-party analytics or external runtime assets are needed.
