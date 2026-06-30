export type RawOffer = {
  reg?: unknown
  insurer?: unknown
  product?: unknown
  premium?: unknown
  period?: unknown
  currency?: unknown
  status?: unknown
  error?: unknown
}

export type OfferPeriod = 'year' | 'month'

export type ValidMtplOffer = {
  reg: string
  insurer: string
  product: 'mtpl'
  premium: number
  period: OfferPeriod
  currency: 'EUR'
  status: 'ok'
  yearlyPremiumEur: number
}

export type CheapestOfferResult = {
  offer: ValidMtplOffer | null
  comparedCount: number
}

const EUR = 'EUR'
const MTPL = 'mtpl'
const OK = 'ok'

function isOfferPeriod(period: unknown): period is OfferPeriod {
  return period === 'year' || period === 'month'
}

export function normalizeRegistration(registration: string): string {
  return registration.trim().replace(/[\s-]+/g, '').toUpperCase()
}

export function parsePremium(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value >= 0 ? value : null
  }

  if (typeof value === 'string') {
    const parsed = Number(value.trim().replace(',', '.'))
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
  }

  return null
}

export function normalizeToYearlyEur(
  premium: number,
  period: unknown,
): number | null {
  if (period === 'year') {
    return premium
  }

  if (period === 'month') {
    return premium * 12
  }

  return null
}

export function toValidMtplOffer(rawOffer: RawOffer): ValidMtplOffer | null {
  if (
    typeof rawOffer.reg !== 'string' ||
    typeof rawOffer.insurer !== 'string' ||
    rawOffer.product !== MTPL ||
    rawOffer.status !== OK ||
    rawOffer.currency !== EUR
  ) {
    return null
  }

  if (!isOfferPeriod(rawOffer.period)) {
    return null
  }

  const premium = parsePremium(rawOffer.premium)

  if (premium === null) {
    return null
  }

  const yearlyPremiumEur = normalizeToYearlyEur(premium, rawOffer.period)

  if (yearlyPremiumEur === null) {
    return null
  }

  return {
    reg: normalizeRegistration(rawOffer.reg),
    insurer: rawOffer.insurer,
    product: MTPL,
    premium,
    period: rawOffer.period,
    currency: EUR,
    status: OK,
    yearlyPremiumEur,
  }
}

export function findCheapestMtplOffer(
  offers: unknown,
  registration: string,
): CheapestOfferResult {
  if (!Array.isArray(offers)) {
    return { offer: null, comparedCount: 0 }
  }

  const normalizedRegistration = normalizeRegistration(registration)
  const validOffers = offers
    .map((offer) => toValidMtplOffer(offer as RawOffer))
    .filter((offer): offer is ValidMtplOffer => {
      return offer !== null && offer.reg === normalizedRegistration
    })

  const cheapestOffer = validOffers.reduce<ValidMtplOffer | null>(
    (cheapest, offer) => {
      if (cheapest === null || offer.yearlyPremiumEur < cheapest.yearlyPremiumEur) {
        return offer
      }

      return cheapest
    },
    null,
  )

  return {
    offer: cheapestOffer,
    comparedCount: validOffers.length,
  }
}
