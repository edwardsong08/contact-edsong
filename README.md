# Contact Edward Song

The personal website and web application inquiry site for [contact.edsong.xyz](https://contact.edsong.xyz).

A minimal, single-screen introduction with a direct email CTA to **edwardsong08@gmail.com**, copy-email fallback, and links to Edward's work. The site does not submit or save inquiry content, and it requires no email API keys or database.

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

Read [CONTEXT.md](CONTEXT.md), [AGENTS.md](AGENTS.md), and [LOGS.md](LOGS.md) for ongoing project context and verified release information.
