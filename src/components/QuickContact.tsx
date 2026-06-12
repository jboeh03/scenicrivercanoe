import { useEffect, useState } from 'react'
import { business } from '@/data/site'

function useIsOpen() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours()
      setOpen(h >= business.hoursOpen && h < business.hoursClose)
    }
    check()
    const t = setInterval(check, 60_000)
    return () => clearInterval(t)
  }, [])
  return open
}

export function QuickContact() {
  const [open, setOpen] = useState(false)
  const isOpen = useIsOpen()

  return (
    <div className="fixed bottom-[5.25rem] right-4 z-[60] flex flex-col items-end gap-3 md:bottom-4">
      {open && (
        <div className="frosted-strong w-[290px] animate-fade-up rounded-3xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                {isOpen && (
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-go" />
                )}
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: isOpen ? '#3f7d6a' : '#b08948' }}
                />
              </span>
              <p className="text-[13px] font-semibold text-ink">
                {isOpen ? 'Open now — at the river' : 'Currently closed'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-ink-faint hover:text-ink" aria-label="Close">
              ✕
            </button>
          </div>

          <p className="mb-3 text-[12.5px] leading-snug text-ink-soft">
            {isOpen
              ? 'We answer texts between trips. Fastest way to reach a human right now:'
              : 'We’re off the water. Our concierge and FAQs can help any time — or leave us a message.'}
          </p>

          <div className="flex flex-col gap-2">
            {isOpen ? (
              <>
                <a href={business.smsHref} className="btn-ink w-full !py-2.5 text-[13px]">
                  💬 Text us
                </a>
                <a href={business.phoneHref} className="btn-ghost w-full !py-2.5 text-[13px]">
                  📞 Call {business.phone}
                </a>
              </>
            ) : (
              <>
                <a href="#concierge" onClick={() => setOpen(false)} className="btn-ink w-full !py-2.5 text-[13px]">
                  ✦ Ask the concierge
                </a>
                <a href="#faqs" onClick={() => setOpen(false)} className="btn-ghost w-full !py-2.5 text-[13px]">
                  Browse FAQs
                </a>
                <a href={business.phoneHref} className="w-full text-center text-[12px] text-ink-faint hover:text-ink">
                  or call {business.phone}
                </a>
              </>
            )}
          </div>
          <p className="mt-3 text-center text-[11px] text-ink-faint">Text & call hours · daily 9am–3pm</p>
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {/* always-available quick call */}
        <a
          href={business.phoneHref}
          aria-label={`Call ${business.phone}`}
          className="frosted-strong flex h-12 w-12 items-center justify-center rounded-full text-lg transition-transform hover:-translate-y-0.5"
        >
          📞
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Chat with us"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-2xl text-canvas shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <span className="relative">
            💬
            <span
              className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-ink"
              style={{ background: isOpen ? '#3f7d6a' : '#b08948' }}
            />
          </span>
        </button>
      </div>
    </div>
  )
}
