import { useEffect, useState } from 'react'
import './App.css'
import {
  findCheapestMtplOffer,
  normalizeRegistration,
  type CheapestOfferResult,
  type RawOffer,
} from './offers'

type SearchState =
  | { status: 'idle' }
  | { status: 'empty' }
  | { status: 'no-match' }
  | { status: 'no-valid-offers' }
  | { status: 'success'; result: CheapestOfferResult }

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

  return offers.some((offer: RawOffer) => {
    return (
      typeof offer.reg === 'string' &&
      normalizeRegistration(offer.reg) === normalizedRegistration
    )
  })
}

function App() {
  const [offers, setOffers] = useState<unknown>([])
  const [registration, setRegistration] = useState('')
  const [isLoading, setIsLoading] = useState(true)
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

    const result = findCheapestMtplOffer(offers, registration)

    if (result.offer === null) {
      setSearchState({ status: 'no-valid-offers' })
      return
    }

    setSearchState({ status: 'success', result })
  }

  const cheapestOffer =
    searchState.status === 'success' ? searchState.result.offer : null

  return (
    <main className="page">
      <section className="calculator" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">Liikluskindlustuse vordlus</p>
          <h1 id="page-title">Leia odavaim MTPL pakkumine</h1>
          <p>
            Sisesta registrinumber ja vaatame mock-andmetest odavaima sobiva
            pakkumise.
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
            <button type="submit" disabled={isLoading}>
              Leia odavaim pakkumine
            </button>
          </div>
        </form>

        <section className="result" aria-live="polite">
          {isLoading && <p>Laen pakkumisi...</p>}

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

          {cheapestOffer !== null && searchState.status === 'success' && (
            <div className="offer">
              <div>
                <p className="label">Kindlustaja</p>
                <p className="value">{cheapestOffer.insurer}</p>
              </div>
              <div>
                <p className="label">Algne hind</p>
                <p className="value">
                  {formatMoney(cheapestOffer.premium)} /{' '}
                  {formatPeriod(cheapestOffer.period)}
                </p>
              </div>
              <div>
                <p className="label">Aastahind</p>
                <p className="value">
                  {formatMoney(cheapestOffer.yearlyPremiumEur)}
                </p>
              </div>
              <div>
                <p className="label">Vorreldud pakkumisi</p>
                <p className="value">{searchState.result.comparedCount}</p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
