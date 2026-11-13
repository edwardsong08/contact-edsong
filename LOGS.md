# Work log

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
