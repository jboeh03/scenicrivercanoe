import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { badges, leaderboard } from '@/data/site'

export function Rewards() {
  const earned = badges.filter((b) => b.earned).length

  return (
    <Section id="rewards">
      <Reveal>
        <p className="eyebrow mb-3 text-center">Reasons to come back</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mx-auto mb-12 max-w-[20ch] text-center text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1]">
          Collect the river. Climb the leaderboard.
        </h2>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <FrostedPanel className="h-full p-7">
            <div className="mb-5 flex items-center justify-between">
              <p className="eyebrow">Your river badges</p>
              <span className="text-[13px] font-medium text-ink-soft">
                {earned}/{badges.length} earned
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((b, i) => (
                <Reveal key={b.id} delay={0.04 * i}>
                  <div
                    className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-center transition-all ${
                      b.earned
                        ? 'border-brand-gold/60 bg-brand-gold/10'
                        : 'border-line bg-white/20'
                    }`}
                  >
                    <span
                      className={`text-3xl transition-all ${
                        b.earned ? '' : 'opacity-30 grayscale'
                      }`}
                    >
                      {b.icon}
                    </span>
                    <span
                      className={`text-[11px] font-semibold leading-tight ${
                        b.earned ? 'text-ink' : 'text-ink-faint'
                      }`}
                    >
                      {b.name}
                    </span>
                    <span className="text-[9px] leading-tight text-ink-faint">{b.desc}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </FrostedPanel>
        </Reveal>

        <Reveal delay={0.1}>
          <FrostedPanel strong className="flex h-full flex-col p-7">
            <div className="mb-5 flex items-center justify-between">
              <p className="eyebrow">Local Legend · this season</p>
              <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-canvas">
                Live
              </span>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-1.5">
              {leaderboard.map((row) => (
                <li
                  key={row.rank}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all ${
                    row.you ? 'bg-ink text-canvas' : 'hairline bg-white/40'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                      row.you ? 'bg-canvas text-ink' : 'bg-ink/8 text-ink'
                    }`}
                  >
                    {row.rank}
                  </span>
                  <span className="flex-1 truncate text-[14px] font-medium">{row.name}</span>
                  <span className={`text-[13px] ${row.you ? 'text-canvas/80' : 'text-ink-faint'}`}>
                    {row.trips} trips
                  </span>
                  <span className="w-16 text-right text-[14px] font-semibold">{row.miles} mi</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-[12px] text-ink-faint">
              7 more miles to pass The Donnellys 👀
            </p>
          </FrostedPanel>
        </Reveal>
      </div>
    </Section>
  )
}
