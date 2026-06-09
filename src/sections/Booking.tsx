import { useMemo, useState } from 'react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { trips, pricing, business } from '@/data/site'
import { QrPlaceholder } from '@/components/QrPlaceholder'
import { WaiverModal } from '@/components/WaiverModal'

export function Booking() {
  const [tripId, setTripId] = useState('mid')
  const [people, setPeople] = useState(2)
  const [date, setDate] = useState('')
  const [signerName, setSignerName] = useState('')
  const [showWaiver, setShowWaiver] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const signed = signerName.length > 0

  const isWeekend = useMemo(() => {
    if (!date) return false
    const d = new Date(date + 'T12:00:00').getDay()
    return d === 0 || d === 6
  }, [date])

  const per = pricing.perPerson + (isWeekend ? pricing.weekendSurcharge : 0)
  const total = per * people
  const canBook = !!date && signed && people > 0
  const trip = trips.find((t) => t.id === tripId)!
  const code = `SRC-${(tripId === 'mid' ? 6 : tripId === 'long' ? 9 : 2)}${people}${(date || '0000').slice(-2)}`

  return (
    <Section id="book">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Reserve in under a minute</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[0.98]">
              Book, sign, and skip the line.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Pick a trip, sign the waiver on your phone, and show your QR code at the put-in. No
              paperwork, no clipboard, no waiting — your shuttle's already accounted for.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-7 space-y-2.5 text-[15px] text-ink-soft">
              <li>✓ Paperless waiver signed at checkout</li>
              <li>✓ QR check-in — scan and go</li>
              <li>✓ Free reschedule up to 12 hours out</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FrostedPanel strong className="p-7">
            {!confirmed ? (
              <>
                <div className="mb-5">
                  <p className="eyebrow mb-2">Trip</p>
                  <div className="grid grid-cols-3 gap-2">
                    {trips.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTripId(t.id)}
                        className={`rounded-2xl px-2 py-3 text-center transition-all ${
                          t.id === tripId
                            ? 'bg-ink text-canvas'
                            : 'hairline bg-white/40 text-ink hover:bg-white/70'
                        }`}
                      >
                        <span className="block text-lg font-bold leading-none">{t.miles}mi</span>
                        <span className="text-[11px] opacity-80">{t.hours}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="eyebrow mb-2">Date</p>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="hairline w-full rounded-2xl bg-white/60 px-3 py-2.5 text-[14px] text-ink outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Paddlers</p>
                    <div className="hairline flex items-center justify-between rounded-2xl bg-white/60 px-2 py-1.5">
                      <Step onClick={() => setPeople((p) => Math.max(1, p - 1))}>–</Step>
                      <span className="text-[15px] font-semibold">{people}</span>
                      <Step onClick={() => setPeople((p) => Math.min(20, p + 1))}>+</Step>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowWaiver(true)}
                  className={`mb-5 flex w-full items-center justify-between gap-3 rounded-2xl p-3 text-left transition-colors hairline ${
                    signed ? 'bg-go/10' : 'bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px]"
                      style={{ background: signed ? '#3f7d6a' : 'rgba(22,24,58,0.08)', color: signed ? '#fff' : '#16183a' }}
                    >
                      {signed ? '✓' : '✎'}
                    </span>
                    <span className="text-[13px] leading-snug text-ink-soft">
                      {signed ? (
                        <>
                          Waiver signed by <span className="font-semibold text-ink">{signerName}</span>
                        </>
                      ) : (
                        <>Review &amp; sign the digital liability waiver</>
                      )}
                    </span>
                  </span>
                  <span className="text-[12px] font-medium text-ink-faint">{signed ? 'Edit' : 'Open →'}</span>
                </button>

                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-[13px] text-ink-faint">
                      {trip.name} · {people} × ${per}
                      {isWeekend && <span className="ml-1">(weekend)</span>}
                    </p>
                    <p className="text-3xl font-semibold text-ink">${total}</p>
                  </div>
                  <span className="text-[12px] text-ink-faint">shuttle included</span>
                </div>

                <button
                  disabled={!canBook}
                  onClick={() => setConfirmed(true)}
                  className="btn-ink w-full disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {date ? 'Confirm reservation' : 'Pick a date to continue'}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center">
                <p className="eyebrow mb-1">You're on the river</p>
                <h3 className="text-2xl font-semibold">{trip.name}</h3>
                <p className="mt-1 text-[14px] text-ink-soft">
                  {date} · {people} paddler{people > 1 ? 's' : ''} · ${total}
                </p>
                <div className="my-6 rounded-3xl bg-white p-5 shadow-sm">
                  <QrPlaceholder size={150} seed={code} />
                </div>
                <p className="text-[13px] font-medium text-ink">Check-in code {code}</p>
                <p className="mt-1 max-w-[32ch] text-[12px] text-ink-faint">
                  Show this at the {business.short} put-in. Waiver signed ✓ — walk straight to the
                  boats.
                </p>
                <button onClick={() => setConfirmed(false)} className="btn-ghost mt-5">
                  Book another trip
                </button>
              </div>
            )}
          </FrostedPanel>
        </Reveal>
      </div>

      {showWaiver && (
        <WaiverModal
          onClose={() => setShowWaiver(false)}
          onSign={(name) => {
            setSignerName(name)
            setShowWaiver(false)
          }}
        />
      )}
    </Section>
  )
}

function Step({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink/8 text-lg text-ink transition-colors hover:bg-ink/15"
    >
      {children}
    </button>
  )
}
