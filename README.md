# Contact Edward Song

The personal website and web application inquiry site for [contact.edsong.xyz](https://contact.edsong.xyz).

A minimal introduction with a **Start a project** CTA leading to a three-field inquiry form. The personal recipient is configured only in the server mail module and is not displayed or bundled in the public frontend. No inquiry database is used.

## Develop

Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Verify

```sh
npm test
npm run typecheck
npm run build
```

## Deploy

Deploy `main` in personal Coolify → Edward Song → production, with the repository Dockerfile. Expose container port `3000` and use `/api/health` for the health check. Configure `https://contact.edsong.xyz` as the production domain. DNS must point the `contact` record at the same public ingress as Edward's existing personal sites.

Next.js standalone output is packaged in a multi-stage Docker build. The page uses system fonts and has no third-party runtime assets or analytics.

The push-only GitHub webhook targets `https://contact.edsong.xyz/api/deploy`. Configure `DEPLOY_WEBHOOK_SECRET` and `COOLIFY_WEBHOOK_URL` as **runtime-only** environment variables in Coolify. The secret must also match Coolify's manual GitHub webhook secret for this application. This narrowly scoped relay verifies GitHub signatures and accepts only this repository's main branch, keeping the Coolify admin interface private. Never commit the target or secret.

For inquiry delivery, configure `RESEND_API_KEY` as a runtime-only secret. `INQUIRY_FROM` optionally overrides the default verified sender `Edward Song <noreply@edsong.xyz>`. The recipient is fixed in the server mail module; the visitor's email is used as Reply-To. Delivery failure keeps the message on screen for retry. Local preview uses port 3096; it can show the form and unavailable-delivery state without credentials.

Client-site footer links can use `https://contact.edsong.xyz/?from=client.example` to include the referring hostname in the inquiry. Only the hostname is kept, and this does not install analytics or change any client website.

Read [CONTEXT.md](CONTEXT.md), [AGENTS.md](AGENTS.md), and [LOGS.md](LOGS.md) for ongoing project context and verified release information.
