// Experimental data-source layer. See README.md ("Experimental: real API
// integration") for why loadRealOffers() is a stub, not a real call.

const USE_REAL_OFFERS = import.meta.env.VITE_USE_REAL_OFFERS === 'true'

export async function loadMockOffers(): Promise<unknown> {
  const response = await fetch('/offers.json')

  if (!response.ok) {
    throw new Error('Pakkumiste laadimine ebaonnestus.')
  }

  return response.json()
}

/**
 * Stub only — never calls the real Kindlustusest API.
 *
 * GET /v1/offers/{guid} on shop-api.kindlustusest.ee is public and safe, but
 * it only returns data for a {guid} that already exists. Minting one
 * requires POST /v1/offers, which (per research in
 * .claude/notes/website-api-notes.md) rides the same Laravel Sanctum
 * session/CSRF bootstrap as GET /sanctum/csrf-cookie and GET /user. That's
 * out of scope under this project's rule against protected/session-based
 * calls, so there is no safe way to obtain a {guid} for an arbitrary
 * user-entered registration number. This function documents that decision
 * instead of forcing an integration.
 */
export async function loadRealOffers(): Promise<unknown> {
  throw new Error(
    'Real Kindlustusest integration not implemented: quote creation ' +
      '(POST /v1/offers) appears session/CSRF-protected. See ' +
      '.claude/notes/website-api-notes.md for details.',
  )
}

export async function loadOffers(): Promise<unknown> {
  if (!USE_REAL_OFFERS) {
    return loadMockOffers()
  }

  try {
    return await loadRealOffers()
  } catch {
    return loadMockOffers()
  }
}
