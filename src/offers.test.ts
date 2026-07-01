import { describe, expect, it } from 'vitest'
import offersFixture from '../public/offers.json'
import {
  findTopMtplOffers,
  getValidMtplOffersForRegistration,
  normalizeRegistration,
  normalizeToYearlyEur,
  toValidMtplOffer,
} from './offers'

describe('normalizeRegistration', () => {
  it('strips spaces and dashes and uppercases the result', () => {
    expect(normalizeRegistration(' 123-abc ')).toBe('123ABC')
  })
})

describe('getValidMtplOffersForRegistration', () => {
  it('returns no offers for malformed (non-array) API data', () => {
    expect(getValidMtplOffersForRegistration(null, '123ABC')).toEqual([])
    expect(getValidMtplOffersForRegistration({}, '123ABC')).toEqual([])
    expect(getValidMtplOffersForRegistration('oops', '123ABC')).toEqual([])
  })

  it('rejects invalid offer records', () => {
    const raw = [
      { reg: 123, insurer: 'If', product: 'mtpl', premium: 100, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 42, product: 'mtpl', premium: 100, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'If', product: 'mtpl', premium: 100, period: 'decade', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'If', product: 'mtpl', premium: { amount: 100 }, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    expect(getValidMtplOffersForRegistration(raw, '123ABC')).toEqual([])
  })

  it('ignores non-MTPL offers', () => {
    const raw = [
      { reg: '123ABC', insurer: 'PZU', product: 'casco', premium: 175, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    expect(getValidMtplOffersForRegistration(raw, '123ABC')).toEqual([])
  })

  it('ignores error-status and null-premium offers', () => {
    const raw = [
      { reg: '123ABC', insurer: 'Gjensidige', product: 'mtpl', premium: null, period: 'year', currency: 'EUR', status: 'error', error: 'timeout' },
      { reg: '123ABC', insurer: 'Ergo', product: 'mtpl', premium: 199, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    const result = getValidMtplOffersForRegistration(raw, '123ABC')

    expect(result).toHaveLength(1)
    expect(result[0].insurer).toBe('Ergo')
  })

  it('sorts valid offers ascending by yearly premium', () => {
    const raw = [
      { reg: '123ABC', insurer: 'Expensive', product: 'mtpl', premium: 300, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'Cheap', product: 'mtpl', premium: 10, period: 'month', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'Middle', product: 'mtpl', premium: 150, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    const result = getValidMtplOffersForRegistration(raw, '123ABC')

    expect(result.map((offer) => offer.insurer)).toEqual(['Cheap', 'Middle', 'Expensive'])
  })
})

describe('normalizeToYearlyEur', () => {
  it('multiplies monthly premiums by 12', () => {
    expect(normalizeToYearlyEur(20, 'month')).toBe(240)
  })

  it('leaves yearly premiums unchanged', () => {
    expect(normalizeToYearlyEur(200, 'year')).toBe(200)
  })

  it('returns null for an unrecognized period', () => {
    expect(normalizeToYearlyEur(200, 'week')).toBeNull()
  })
})

describe('toValidMtplOffer', () => {
  it('accepts a well-formed offer', () => {
    const offer = toValidMtplOffer({
      reg: '123abc',
      insurer: 'If',
      product: 'mtpl',
      premium: 245,
      period: 'year',
      currency: 'EUR',
      status: 'ok',
    })

    expect(offer).toEqual({
      reg: '123ABC',
      insurer: 'If',
      product: 'mtpl',
      premium: 245,
      period: 'year',
      currency: 'EUR',
      status: 'ok',
      yearlyPremiumEur: 245,
    })
  })

  it('rejects non-object input', () => {
    expect(toValidMtplOffer(null)).toBeNull()
    expect(toValidMtplOffer('123ABC')).toBeNull()
  })
})

describe('findTopMtplOffers', () => {
  it('defaults to the top 3 offers and reports the compared count', () => {
    const raw = [
      { reg: '123ABC', insurer: 'A', product: 'mtpl', premium: 400, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'B', product: 'mtpl', premium: 300, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'C', product: 'mtpl', premium: 200, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'D', product: 'mtpl', premium: 100, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    const result = findTopMtplOffers(raw, '123ABC')

    expect(result.comparedCount).toBe(4)
    expect(result.offers.map((offer) => offer.insurer)).toEqual(['D', 'C', 'B'])
  })

  it('respects a custom count and returns fewer than requested when not enough valid offers exist', () => {
    const raw = [
      { reg: '123ABC', insurer: 'A', product: 'mtpl', premium: 200, period: 'year', currency: 'EUR', status: 'ok' },
      { reg: '123ABC', insurer: 'B', product: 'mtpl', premium: 100, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    expect(findTopMtplOffers(raw, '123ABC', 1).offers.map((offer) => offer.insurer)).toEqual(['B'])
    expect(findTopMtplOffers(raw, '123ABC', 5).offers).toHaveLength(2)
  })

  it('returns no offers for an empty or unknown registration', () => {
    const raw = [
      { reg: '123ABC', insurer: 'If', product: 'mtpl', premium: 245, period: 'year', currency: 'EUR', status: 'ok' },
    ]

    expect(findTopMtplOffers(raw, '').offers).toEqual([])
    expect(findTopMtplOffers(raw, '999ZZZ').offers).toEqual([])
  })

  describe('against the public/offers.json fixture', () => {
    it('produces the expected top 3 for 123ABC', () => {
      const result = findTopMtplOffers(offersFixture, '123ABC')

      expect(result.comparedCount).toBe(6)
      expect(
        result.offers.map((offer) => [offer.insurer, offer.yearlyPremiumEur]),
      ).toEqual([
        ['Ergo', 199],
        ['LHV', 199],
        ['Seesam', 210],
      ])
    })

    it('produces the expected top 3 for 456DEF', () => {
      const result = findTopMtplOffers(offersFixture, '456DEF')

      expect(result.comparedCount).toBe(4)
      expect(
        result.offers.map((offer) => [offer.insurer, offer.yearlyPremiumEur]),
      ).toEqual([
        ['LHV', 252],
        ['Ergo', 265],
        ['If', 280],
      ])
    })
  })
})
