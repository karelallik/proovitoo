import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const mockOffers = [
  { reg: '123ABC', insurer: 'If', product: 'mtpl', premium: 245, period: 'year', currency: 'EUR', status: 'ok' },
  { reg: '123ABC', insurer: 'LHV', product: 'mtpl', premium: 30, period: 'month', currency: 'EUR', status: 'ok' },
]

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
  cleanup()
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('shows the idle hint once offers have loaded', async () => {
    render(<App />)

    expect(await screen.findByText(/Proovi registrinumbreid/i)).toBeTruthy()
  })

  it('shows a validation message when submitting an empty registration', async () => {
    render(<App />)

    await screen.findByText(/Proovi registrinumbreid/i)

    screen.getByRole('button', { name: /Leia odavaimad pakkumised/i }).click()

    expect(await screen.findByText(/Palun sisesta registrinumber/i)).toBeTruthy()
  })

  it('renders offer cards for a matching registration', async () => {
    render(<App />)

    await screen.findByText(/Proovi registrinumbreid/i)

    fireEvent.change(screen.getByLabelText(/registrinumber/i), {
      target: { value: '123ABC' },
    })
    screen.getByRole('button', { name: /Leia odavaimad pakkumised/i }).click()

    const cards = await screen.findAllByRole('listitem')
    expect(cards).toHaveLength(2)
    expect(screen.getByText('LHV')).toBeTruthy()
    expect(screen.getByText('If')).toBeTruthy()
    expect(screen.getByText('Soodsaim')).toBeTruthy()
  })
})
