# Kindlustusest — API research notes

Living document of observations from inspecting Network traffic on the real
Kindlustusest motor insurance (MTPL) comparison flow at
`https://uus.kindlustusest.ee/`. Research-only; see [CLAUDE.md](../../CLAUDE.md)
for the rules governing this file.

**Never recorded here**: cookie values, auth/session tokens, API keys, CSRF
tokens, or real personal data. Only cookie/field *names* and structural
shapes are captured. All example values below come from the site's own
placeholder/demo registration plate `123ABC` — the site's demo record
already masks owner PII with `"***"` server-side.

Status legend: 🟢 documented · 🟡 partially observed · 🔴 protected/session-required

Investigated: 2026-07-01, via live Chrome session (Claude in Chrome MCP tools).

---

## Flow overview

1. 🟢 Landing page (`/`) has a "Liikluskindlustus" (MTPL) form: a single
   `Registrimärk` (plate) input + "Edasi" submit button.
2. 🟢 On submit, the SPA (backed by API host `shop-api.kindlustusest.ee`)
   creates a quote/offer resource server-side and the browser is routed to
   `https://uus.kindlustusest.ee/pakkumine?service=mtpl&step=liiklus1&licenseplate={PLATE}&id={offerGuid}`.
3. 🟢 The `pakkumine` page loads and fetches the full offer/quote object by
   `id` (a GUID). That single response already contains **all** pricing
   variants (every coverage-period × payment-frequency combination), so
   changing the "Kaitse pikkus" (coverage length) or "Maksesagedus" (payment
   frequency) selectors client-side triggers **no further network calls** —
   it's a pure client-side re-render from the already-fetched payload.
4. 🟡 Not yet explored: checkout/purchase step, payment step, cart flow
   (`/v1/carts/{guid}`), the kaskokindlustus (CASCO) flow, or what happens
   for an invalid/unknown plate.

The API host (`shop-api.kindlustusest.ee`) is a separate origin from the
frontend (`uus.kindlustusest.ee`) — this is a decoupled SPA + API backend
(Laravel API, judging by the Sanctum CSRF endpoint below), not an
SSR-only site.

---

## Endpoints

All endpoints below are under base URL `https://shop-api.kindlustusest.ee/v1`.

### 🟢 `GET /offers/{guid}` — fetch a quote/offer bundle

- **Method / URL**: `GET https://shop-api.kindlustusest.ee/v1/offers/{guid}`
  (`{guid}` = the `id` query param from the `/pakkumine` page URL)
- **Request payload**: none (GET, no body). Worked from a plain `fetch()`
  with no custom headers and no cookies required.
- **Response shape** (top-level keys):
  ```
  guid, created, completed, status, request_data, metadata, object,
  offers, comparison_table, related_groups, policy_id, archived,
  variant_selected, cart_guid, cart, renewal, history, version_guid,
  restore_guid
  ```
  - `request_data`: echoes the original query — `start_date`, `service`
    (`"mtpl"`), `package` (array, e.g. `["STANDARD","PREMIUM","PREMIUM_PLUS"]`),
    `licenseplate`, `usage` (`"ORDINARY"`), plus many nullable fields for a
    logged-in/lead flow (`name`, `email`, `phone`, `lease`, `utm_source`, etc.)
  - `metadata`: `allowable_start`, `offer_valid_until`, `stopped_vehicle`
    (bool), `existing_policy` (`end_date`, `insured` bool, `type`),
    `acceptable` (bool), `exclusion`, `inspection` (`next_inspection`,
    `expired` bool), `start_date_too_far` (bool)
  - `object`: vehicle + owner info returned by plate lookup —
    `object.object` has `licenseplate, manufacturer, vin_code, model, power,
    weight, seats, category, body_type, state, engine_type, usage,
    usage_code, category_type, year, first_reg_date,
    next_inspection_date, first_owner, temporarily_deleted`.
    `vin_code` and all `owner`/`responsible` personal fields
    (`code`, `name`, `first_name`) are **already masked as `"***"` by the API
    itself** — the site does not expose real owner PII through this
    endpoint. `lessor` (a company, e.g. a leasing firm name/code) is not
    masked since it's business data, not personal data.
  - `offers`: array, one entry per insurer. Each entry:
    `packages` (object keyed `"0".."3"`, one per package tier), `insurer`
    (string, e.g. `"Balcia"`), `tooltips`, `terms_url` (link to the
    insurer's T&C document — treat as a public URL, not inspected further).
    Each `packages[n]` has `quote_id`, `offer_id`, `created`, `object`
    (repeats the vehicle/owner block above), and `variants`: an array with
    one entry **per coverage-period/payment-frequency combination**, each
    with `guid, amount, overall_amount, unit ("month"), period ("12"),
    start_date, end_date, payment_nr, first_payment_amount,
    additional_fee, package, additional_products, installments[]`.
    `installments[]` breaks the total into individual payment due dates
    with `amount`, `insurer_amount`, `customer_amount`, `due_date`, and
    `items[]` (per-product cost lines, e.g. `product: "MTPL"`).
- **Auth / session required**: **none observed.** Returned 200 with full
  data from a bare unauthenticated `fetch()`, no cookies, no headers.
- **What it does**: returns the complete precomputed quote — vehicle
  lookup result + every insurer's price across all coverage lengths and
  payment frequencies — for a previously-created quote GUID.
- **Classification**: 🟢 **public, read-only, looks safe to call directly**
  — but only reachable if you already have a valid `{guid}`, which today is
  only minted by the (unobserved) creation step. Treat the GUID as a
  capability token: anyone with it can read that quote, so don't log/share
  GUIDs unnecessarily even though no PII of the actual customer leaks
  through it.
- **Reuse recommendation**: could be used directly by our app **once we
  understand quote creation** (see `POST /offers` below, not yet fully
  observed). Do not implement yet — see open questions.

### 🟡 `POST /offers` — create a quote (inferred, not directly captured)

- **Method / URL**: `POST https://shop-api.kindlustusest.ee/v1/offers`
  (seen only via `performance.getEntriesByType('resource')` as an
  `xmlhttprequest` call; exact request body and response were **not**
  captured — the passive network-request tool in this session only
  reliably surfaced CORS `OPTIONS` preflights, not the real request/response
  bodies, for same-origin-timed XHRs fired during page navigation).
- **What it appears to do**: given the submitted `licenseplate` (and
  implicitly `service=mtpl`), creates a new quote resource server-side and
  returns (or the frontend otherwise obtains) the `guid` used in the
  `/pakkumine?...&id={guid}` redirect and in `GET /offers/{guid}` above.
- **Auth / session required**: unknown — likely relies on the
  `XSRF-TOKEN` cookie (see Sanctum note below) since it's a mutating POST.
- **Classification**: 🟡 **unclear — likely session/CSRF-protected.** Do
  not assume it's safely callable from arbitrary app code without further
  observation.
- **Open TODO**: re-observe this call with a proper request-capturing
  method (e.g. real browser DevTools Network panel with "preserve log", or
  a MITM proxy) rather than this session's tooling, which could not
  reliably capture in-flight POST bodies/responses.

### 🟡 `GET/POST /vehicle/details` — vehicle lookup by plate (inferred)

- Seen only as a resource-timing entry
  (`https://shop-api.kindlustusest.ee/v1/vehicle/details`), fired around the
  same time as the `Edasi` submit. Likely resolves `licenseplate` →
  manufacturer/model/VIN/etc. shown in the `object` block above.
- **Classification**: 🟡 not directly inspected — request/response not
  captured this session.

### 🟢 `GET /sanctum/csrf-cookie` — CSRF cookie bootstrap

- Confirms the backend is a **Laravel API using Sanctum** for CSRF
  protection: this endpoint sets the `XSRF-TOKEN` cookie, which the SPA
  must echo back as an `X-XSRF-TOKEN` header on subsequent state-changing
  (`POST`/`PUT`/`DELETE`) requests.
- **Classification**: 🔴 infrastructure/session-bootstrap endpoint — not
  something to call directly from our app; it exists to support the
  official frontend's own session, not for third-party reuse.

### 🟡 `GET /user` — current user/session info

- Returned **HTTP 500** when re-called directly via `fetch()` outside the
  original page-load sequence (likely expects proper Sanctum
  cookie/header state that a simple replay didn't reproduce cleanly).
- **Classification**: 🔴 **protected/session-dependent.** Do not attempt to
  call this from app code. For an anonymous MTPL quote flow it's likely
  just informational for the official frontend (e.g. "is a customer logged
  in") and not required for the comparison feature.

### 🟢 `GET /flags` — feature flags

- Response: `{ greenButtons, upsellSections, downsellSections }` (booleans
  or arrays gating UI experiments/upsell sections).
- **Classification**: 🟢 public, but purely a UI feature-flag mechanism for
  the official site — irrelevant to a standalone comparison implementation.

### 🟢 `GET /options/mtpl` — MTPL form options/config

- Response: `{ settings: {...} }` — likely the dropdown choices (coverage
  lengths, usage types) shown on the `pakkumine` page. Not fully expanded
  this session.
- **Classification**: 🟢 public config endpoint. Potentially useful as a
  reference for valid `usage`/`package`/period values, but not required if
  we only need the cheapest-offer numbers.

### 🟡 `GET /init` — app bootstrap

- Not inspected in detail. Likely general app config (currency, locale,
  environment flags). Low priority.

### 🟡 `GET /carts/{guid}` — cart resource

- Cart GUID comes from a `lastCartId` cookie. Not inspected — out of scope
  for a read-only "cheapest MTPL offer" use case; this matters once a user
  proceeds to actually purchase a policy (checkout flow), which is out of
  scope for this comparison feature.

---

## Session / cookies observed (names only — no values recorded)

Cookie **names** present in the browser after loading the site (values
never recorded, never will be):

- `XSRF-TOKEN` — Laravel Sanctum CSRF token (session/mutation auth)
- `lastCartId` — ties browser session to a cart GUID
- `landing_page` — marketing attribution
- Analytics/tracking only, not relevant to the API contract:
  `_ga*`, `_gcl_*`, `_fbp`, `_hjSession*`, `_dd_s` (Datadog RUM),
  `CookieConsent`

No `Authorization` header or bearer token was observed anywhere in this
flow — auth, where it exists (`/user`, mutating POSTs), is cookie/CSRF
based, not token based.

---

## Validation & error behavior

- ⬜ Invalid registration number format: not yet tested.
- ⬜ Unknown/nonexistent registration number: not yet tested.
- ⬜ Rate limiting / anti-bot behavior: not observed; no CAPTCHA encountered
  during this session's single manual run.

---

## Open questions

- What exactly does `POST /offers` (and possibly `POST /vehicle/details`)
  require as a request body, and does it need the Sanctum CSRF header? This
  is the missing piece for understanding "how do you legitimately obtain a
  `{guid}}` to feed into `GET /offers/{guid}`".
- Does `GET /offers/{guid}` remain reachable indefinitely, or does it expire
  (note `metadata.offer_valid_until` in the response — suggests quotes are
  time-limited)?
- Is `GET /offers/{guid}` rate-limited or otherwise abuse-protected for
  enumeration of GUIDs? (GUIDs are high-entropy, so brute-forcing is
  impractical regardless — not tested, not attempted.)
- What does the CASCO (Kaskokindlustus) flow look like — same API shape
  under a different `service` value, or a different endpoint entirely?
- The passive network-capture tool available in this session did not
  reliably show real request/response bodies for XHRs fired around
  navigation events (only CORS preflights). A follow-up session with actual
  browser DevTools (Network tab, "Preserve log") or a proxy would be needed
  to fully confirm the `POST /offers` contract.

## Recommendation for implementation phase (not yet actioned)

- `GET /v1/offers/{guid}` looks safe and public enough to call directly
  once we have a `guid`, **if** we can determine a public, non-session way
  to create one (or if the existing app is allowed to just deep-link users
  through the real site's own form to obtain a `guid`, then read the result).
- Do **not** implement direct calls to `/user`, `/carts/*`, or CSRF/session
  bootstrap endpoints — those are for the official frontend's own session
  management, not a third-party comparison tool.
- Any implementation decision here still requires explicit user sign-off
  per [CLAUDE.md](../../CLAUDE.md) — this file only documents, it does not
  authorize moving to implementation.
