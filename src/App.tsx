import { useEffect, useState } from 'react'
import './App.css'
import {
  findTopMtplOffers,
  isRecord,
  normalizeRegistration,
  type TopOffersResult,
} from './offers'

type SearchState =
  | { status: 'idle' }
  | { status: 'empty' }
  | { status: 'no-match' }
  | { status: 'no-valid-offers' }
  | { status: 'success'; result: TopOffersResult }

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('et-EE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatPeriod(period: string): string {
  if (period === 'year') {
    return 'aasta'
  }

  if (period === 'month') {
    return 'kuu'
  }

  return period
}

function hasRegistrationMatch(offers: unknown, registration: string): boolean {
  if (!Array.isArray(offers)) {
    return false
  }

  const normalizedRegistration = normalizeRegistration(registration)

  return offers.some((offer) => {
    return (
      isRecord(offer) &&
      typeof offer.reg === 'string' &&
      normalizeRegistration(offer.reg) === normalizedRegistration
    )
  })
}

function App() {
  const [offers, setOffers] = useState<unknown>([])
  const [registration, setRegistration] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [searchState, setSearchState] = useState<SearchState>({ status: 'idle' })

  useEffect(() => {
    async function loadOffers() {
      try {
        const response = await fetch('/offers.json')

        if (!response.ok) {
          throw new Error('Pakkumiste laadimine ebaonnestus.')
        }

        setOffers(await response.json())
      } catch {
        setLoadError('Pakkumiste laadimine ebaonnestus. Proovi hiljem uuesti.')
      } finally {
        setIsLoading(false)
      }
    }

    loadOffers()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (registration.trim() === '') {
      setSearchState({ status: 'empty' })
      return
    }

    if (!hasRegistrationMatch(offers, registration)) {
      setSearchState({ status: 'no-match' })
      return
    }

    setIsSearching(true)

    setTimeout(() => {
      const result = findTopMtplOffers(offers, registration)

      if (result.offers.length === 0) {
        setSearchState({ status: 'no-valid-offers' })
        setIsSearching(false)
        return
      }

      setSearchState({ status: 'success', result })
      setIsSearching(false)
    }, 500)
  }

  return (
    <main className="page">
      <section className="calculator" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">Liikluskindlustuse vordlus</p>
          <h1 id="page-title">Leia 3 odavaimat MTPL pakkumist</h1>
          <p>
            Sisesta registrinumber ja vaatame mock-andmetest kuni kolm
            odavaimat sobivat pakkumist.
          </p>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="registration">Soiduki registrinumber</label>
          <div className="search-row">
            <input
              id="registration"
              name="registration"
              type="text"
              value={registration}
              onChange={(event) => setRegistration(event.target.value)}
              placeholder="Naiteks 123ABC"
              autoComplete="off"
            />
            <button type="submit" disabled={isLoading || isSearching}>
              Leia odavaimad pakkumised
            </button>
          </div>
        </form>

        <section className="result" aria-live="polite">
          {isLoading && <p>Laen pakkumisi...</p>}

          {isSearching && <p>Otsin pakkumisi...</p>}

          {loadError !== null && <p className="message error">{loadError}</p>}

          {!isLoading && loadError === null && searchState.status === 'idle' && (
            <p className="message">Proovi registrinumbreid 123ABC voi 456DEF.</p>
          )}

          {searchState.status === 'empty' && (
            <p className="message error">Palun sisesta registrinumber.</p>
          )}

          {searchState.status === 'no-match' && (
            <p className="message error">
              Selle registrinumbriga pakkumisi ei leitud.
            </p>
          )}

          {searchState.status === 'no-valid-offers' && (
            <p className="message error">
              Sellele soidukile ei ole kehtivaid MTPL pakkumisi.
            </p>
          )}

          {searchState.status === 'success' && (
            <>
              <div className="offer-list">
                {searchState.result.offers.map((offer, index) => (
                  <div
                    key={`${offer.insurer}-${index}`}
                    className={
                      index === 0 ? 'offer offer--cheapest' : 'offer'
                    }
                  >
                    {index === 0 && (
                      <p className="offer-badge">Soodsaim</p>
                    )}
                    <div>
                      <p className="label">Kindlustaja</p>
                      <p className="value">{offer.insurer}</p>
                    </div>
                    <div>
                      <p className="label">Maksesagedus</p>
                      <p className="value">{formatPeriod(offer.period)}</p>
                    </div>
                    <div>
                      <p className="label">Algne hind</p>
                      <p className="value">
                        {formatMoney(offer.premium)} /{' '}
                        {formatPeriod(offer.period)}
                      </p>
                    </div>
                    <div>
                      <p className="label">Aastahind</p>
                      <p className="value">
                        {formatMoney(offer.yearlyPremiumEur)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="message">
                Vorreldud pakkumisi: {searchState.result.comparedCount}
              </p>
            </>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
