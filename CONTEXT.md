# Project context

Personal website and web application inquiries for Edward Song at https://contact.edsong.xyz.

Edward requested an Apple-like experience and rejected the initial longer landing page as bloated. The current design is one focused screen: large system typography, restrained grayscale, a blue email button, copyable address, and links to his portfolio and LinkedIn. No inquiry content is submitted to this server or stored in a database.

Stack: Next.js App Router, React, TypeScript, system fonts, plain CSS, standalone Docker image on port 3000. GET /api/health provides a minimal health endpoint.

GitHub cannot reach Coolify's private admin port. POST /api/deploy validates a GitHub HMAC-SHA256 signature using runtime-only DEPLOY_WEBHOOK_SECRET, allows only edwardsong08/contact-edsong main pushes, then forwards the raw signed payload to the fixed runtime-only COOLIFY_WEBHOOK_URL. The same secret is configured for the app's manual GitHub webhook in Coolify. No Coolify API token is used or exposed. The route handles ping locally, caps payloads at 2 MiB, and never returns internal service responses.

Repository and verified deployment details are recorded in LOGS.md. No third-party analytics or external runtime assets are needed.
