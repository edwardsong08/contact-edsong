# Contact Edward Song

The personal website and web application inquiry site for [contact.edsong.xyz](https://contact.edsong.xyz).

Visitors can explore the types of projects Edward builds and create an email brief addressed to **edwardsong08@gmail.com**. They choose an email app or Gmail and send the message themselves. The site does not submit or save inquiry content, and it requires no email API keys or database.

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

Next.js standalone output is packaged in a multi-stage Docker build. Fonts are bundled locally; the page has no third-party runtime assets, analytics, or secret configuration. GitHub push webhooks trigger automatic deployments after setup.

Read [CONTEXT.md](CONTEXT.md), [AGENTS.md](AGENTS.md), and [LOGS.md](LOGS.md) for ongoing project context and verified release information.
