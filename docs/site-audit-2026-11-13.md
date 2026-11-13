# Contact site audit — November 13, 2026

Overall rating after the included fixes: **8.5 / 10**. This is an engineering and user-experience judgment, not a Lighthouse score or a certification. The site has a clear purpose, real work samples, a short inquiry path, and a restrained visual design. The largest remaining improvement is more concrete evidence of Edward's contribution to each project.

The visitor story reviewed was: arrive from a website footer → understand the offer → review selected work → return or open the inquiry form → receive validation or an honest sending result. The main profile and other project sites were not modified.

| Area | Rating | Assessment |
| --- | --- | --- |
| Design and focus | 9 | Coherent typography, space, and a single primary action. The homepage stays one focused screen. |
| Navigation and recovery | 9 | Explicit portfolio Back link, preserved referral context, and a useful missing-page recovery path. |
| Mobile and accessibility | 8.5 | Three pages checked at 320, 390, and 768 CSS pixels, plus desktop review; no horizontal overflow. Clear labels, error focus, skip navigation, and stronger contrast. Formal assistive-technology acceptance remains unverified. |
| Portfolio content | 8 | Five real sites demonstrate range. Descriptions still lean toward project introductions rather than exact contribution and scope. |
| Form and delivery reliability | 8.5 | Validation, honest error handling, preserved drafts, provider acceptance checks, retry keys, and bounded abuse controls. No fresh inbox-delivery test was performed in this audit. |
| Performance and discoverability | 8 | Compact HTML, system fonts, optimized previews, appropriate canonicals and indexing. Field performance and throttled mobile loading have not been measured. |
| Security and privacy | 8.5 | Fixed server recipient, runtime-only secrets, origin checks, payload limits, signed deployment relay, non-root container, and baseline response-header protections. Rate counters remain process-local. |

The overall score is the arithmetic mean of these seven equally weighted ratings.

## Findings addressed in this release

| Finding | Priority | Change and evidence |
| --- | --- | --- |
| Portfolio had no explicit return control | Medium | Added a visible ← Back link to home alongside Start a project. Its accessible label is Back to home. It preserves the normalized referring hostname and works on direct visits without browser history. |
| Some form return links dropped referral context | Low | Corrected the form wordmark and post-success home link. Local home → work → Back and form → wordmark navigation retained only client.example from the synthetic referring URL. |
| Form markup defaulted to GET if JavaScript was unavailable | Medium | Added method=post and a fixed same-site action. Controls remain disabled until the client is interactive, with existing noscript guidance. Initial response HTML confirms POST, /api/inquiry, and disabled controls. This prevents a fallback submission from putting the name, email, or message in the URL. |
| Faint text and controls reduced accessibility | Medium | Darkened the light headline gradient stop, footer, and placeholder; increased small footer/navigation/helper text; strengthened input borders, keyboard focus, and button hover contrast. The restrained visual direction is retained. |
| Missing pages had no clear route home | Low | Added a matching 404 view with Back to home and My work. The missing route retains HTTP 404 and noindex behavior. |
| CSP and HSTS headers were absent | Low | Added a baseline CSP for base URLs, embedded objects, framing, and form destinations. Added production HSTS for this host for one year, without includeSubDomains or preload. The existing DENY, nosniff, referrer, and permissions headers remain. This CSP does not restrict script execution. |

## Accessibility evidence

Calculated source-color ratios, before and after the changes:

| Element | Before | After |
| --- | --- | --- |
| Lightest large headline gradient stop against page background | 2.43:1 | 3.51:1 |
| Footer text against page background | 3.51:1 | 4.91:1 |
| Textarea placeholder against white | 3.62:1 | 5.07:1 |
| White button text in hover state | 4.32:1 | 4.78:1 |
| Input boundary against white | approximately 1.5:1 | 3.35:1 |

Regular secondary text is 4.91:1 against the page background. Blue links and opaque focus outlines are 4.54:1 against that background. These calculations use the declared colors; they are not a pixel-by-pixel or complete WCAG conformance audit. The relevant text thresholds are 4.5:1 for normal text and 3:1 for large text. See [W3C's contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

- Each reviewed page has one H1 and one main landmark.
- The skip link moves the next keyboard stop into the main content. Portfolio project links have visible focus and announce that they open a new tab.
- Native required-field validation focused the empty name field. A whitespace-only message reached server validation, which focused the message, set aria-invalid, and associated the error text.
- A valid synthetic local submission with mail configuration absent showed the unavailable message, retained the draft, and re-enabled submission. No mail provider call was possible in that local configuration.
- CSS includes reduced-motion and forced-colors handling. Screen-reader speech output, physical devices, browser zoom at 200%, and forced-colors rendering were not independently exercised.

## Route, security, and delivery checks

| Check | Observed result |
| --- | --- |
| Home, /portfolio, /start | HTTP 200; intended page content |
| Missing route | HTTP 404; noindex; recovery link tested locally |
| robots.txt, sitemap.xml, /api/health | HTTP 200 |
| GET /api/inquiry and GET /api/deploy | HTTP 405 |
| Cross-origin inquiry | HTTP 403 before delivery |
| Same-origin inquiry with invalid fields | HTTP 400 before delivery |
| Unsigned deployment request | HTTP 401 before forwarding |
| Five external project links | All returned HTTP 200 to HEAD requests |
| HTTP entry | HTTP 302 redirect to HTTPS |
| Public HTML and ten unique client scripts | No fixed recipient address, mailto link, or secret-setting identifiers found |
| Coolify configuration names/flags | Resend and webhook secrets remain runtime-only, not build-time; values were not read |
| Production dependency audit | npm audit --omit=dev: zero reported vulnerabilities |
| Automated checks | All 11 existing tests, TypeScript checking, and optimized production build passed |

Source review covered validation, streamed request-size limits, honeypot behavior, fixed mail recipient and From, visitor Reply-To, provider timeout and acceptance checks, idempotency keys, generic errors, bounded counters, webhook signature comparison, allowed repository/branch, and forwarding timeouts. Tests cover provider success/failure and abuse controls using substitutes; they do not send mail.

There was no new email sent during this audit. The previously authorized delivered test is recorded in LOGS.md. Current inbox receipt, sender reputation, and DNS/mail-provider acceptance were not re-tested here.

The header changes follow [MDN's CSP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) and [HSTS reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security). A baseline CSP is a defense-in-depth measure and does not replace output escaping or a future nonce-based script policy.

## Performance and search evidence

The initial public sample returned home, portfolio, and form response headers in approximately 351–405 ms from this workstation. Decoded HTML was approximately 11.3 KB, 32.7 KB, and 12.0 KB respectively before this release. These are single-request observations, not a throughput or mobile benchmark.

Ten unique JavaScript files across all three routes totaled 612,688 decoded bytes. Shared framework files are reused; this is neither the compressed network transfer size nor a per-page total. No third-party font, analytics, or component library is imported by the app. Portfolio previews have fixed dimensions, responsive sizes, and Next image optimization; the featured preview is preloaded and later previews load lazily.

Home and portfolio have clean canonical URLs and are in the sitemap. The form has its own canonical and noindex, follow. Query-string referrals are excluded from canonical URLs and are reduced to a hostname before inclusion in an inquiry. Social metadata and the existing social image are configured. Homepage and portfolio remain dynamically rendered to handle referral context; private/no-store HTML responses avoid shared caching of it.

## Remaining improvements, in priority order

1. **Make each project more specific.** Replace broad introductory wording with one concise sentence identifying Edward's role and what he built. Add only verifiable outcomes. This can fit in the current gallery without more homepage sections.
2. **Add a brief form privacy explanation.** Explain that the submitted details reach Edward through Resend and how they are handled, while keeping the personal recipient address private. No broad policy promises should be invented.
3. **Measure real mobile performance and delivery health.** Field Core Web Vitals and current inbox delivery remain unmeasured in this audit. A lightweight failure alert without message contents would improve operations before traffic grows.
4. **Strengthen controls if deployment grows.** Share rate counters before running multiple instances. Validate proxy/IP-header trust as part of an infrastructure review. A restrictive nonce-based script CSP can be assessed separately from the baseline added here.

This audit did not include an infrastructure penetration test, external provider internals, a restore drill, load testing, formal accessibility certification, or conversion analytics. No customer data or private dashboards were used. Raw local evidence is retained under ignored artifacts/; release verification is retained in artifacts/audit-release.json and screenshots.
