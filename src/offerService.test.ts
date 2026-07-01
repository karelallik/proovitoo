import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadOffers, loadRealOffers } from './offerService'

const mockOffers = [{ reg: '123ABC', insurer: 'If' }]

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockOffers),
      }),
    ),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('loadRealOffers', () => {
  it('never calls the real API and always rejects, explaining why', async () => {
    await expect(loadRealOffers()).rejects.toThrow(/session\/CSRF-protected/)
    expect(fetch).not.toHaveBeenCalled()
  })
})

describe('loadOffers', () => {
  it('defaults to loading the mock offers.json (VITE_USE_REAL_OFFERS unset)', async () => {
    const offers = await loadOffers()

    expect(offers).toEqual(mockOffers)
    expect(fetch).toHaveBeenCalledWith('/offers.json')
  })
})
