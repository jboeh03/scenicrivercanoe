import { useState } from 'react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { faqs, business } from '@/data/site'

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faqs">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-3">Good to know</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1]">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              Everything from what to pack to our cancellation policy. Still stuck? Ask the concierge
              or text us at{' '}
              <a href={business.phoneHref} className="font-medium text-ink underline-offset-2 hover:underline">
                {business.phone}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FrostedPanel className="divide-y divide-line overflow-hidden p-2">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  >
                    <span className={`text-[15px] font-medium ${isOpen ? 'text-ink' : 'text-ink-soft'}`}>
                      {f.q}
                    </span>
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/8 text-ink transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-[14px] leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </FrostedPanel>
        </Reveal>
      </div>
    </Section>
  )
}
