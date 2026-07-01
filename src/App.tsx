import { useEffect, useState } from 'react'
import './App.css'
import {
  findTopMtplOffers,
  isRecord,
  normalizeRegistration,
  type TopOffersResult,
} from './offers'
import { loadOffers } from './offerService'

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

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2 4 5v6c0 5 3.4 8.7 8 9 4.6-.3 8-4 8-9V5l-8-3Z"
      />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M18 4h3v2a4 4 0 0 1-4 4h-.29A6 6 0 0 1 13 13.94V17h3v2H8v-2h3v-3.06A6 6 0 0 1 7.29 10H7a4 4 0 0 1-4-4V4h3V2h12v2Zm-12 2H5a2 2 0 0 0 2 2V6Zm12 0v2a2 2 0 0 0 2-2h-2Z"
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2Zm0-8h-2V7h2Z"
      />
    </svg>
  )
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
    async function load() {
      try {
        setOffers(await loadOffers())
      } catch {
        setLoadError('Pakkumiste laadimine ebaonnestus. Proovi hiljem uuesti.')
      } finally {
        setIsLoading(false)
      }
    }

    load()
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
              <p className="results-heading">
                <TrophyIcon />
                Soodsaimad pakkumised
              </p>
              <ol className="offer-list">
                {searchState.result.offers.map((offer, index) => (
                  <li
                    key={`${offer.insurer}-${index}`}
                    className={
                      index === 0 ? 'offer-card offer-card--top' : 'offer-card'
                    }
                    data-rank={index + 1}
                  >
                    {index === 0 && (
                      <p className="offer-badge">Soodsaim</p>
                    )}
                    <div className="offer-card__header">
                      <span className="offer-card__icon">
                        <ShieldIcon />
                      </span>
                      <p className="offer-card__insurer">{offer.insurer}</p>
                      <span className="offer-card__rank">{index + 1}. koht</span>
                    </div>
                    <div className="offer-card__grid">
                      <div>
                        <p className="label">Algne hind</p>
                        <p className="value">
                          {formatMoney(offer.premium)} /{' '}
                          {formatPeriod(offer.period)}
                        </p>
                      </div>
                      <div>
                        <p className="label">Maksesagedus</p>
                        <p className="value value--sub">
                          {formatPeriod(offer.period)}
                        </p>
                      </div>
                      <div>
                        <p className="label">Aastahind</p>
                        <p className="value value--accent">
                          {formatMoney(offer.yearlyPremiumEur)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="message message--meta">
                <InfoIcon />
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
