import { useState } from 'react'
import { waiver } from '@/data/site'

export function WaiverModal({
  onSign,
  onClose,
}: {
  onSign: (name: string) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [agree, setAgree] = useState(false)
  const canSign = name.trim().length > 1 && agree

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/40 p-3 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="frosted-strong flex max-h-[88vh] w-full max-w-lg flex-col rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <p className="eyebrow">{waiver.org}</p>
            <h3 className="mt-1 text-lg font-semibold leading-tight">{waiver.title}</h3>
          </div>
          <button onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 text-[13px] leading-relaxed text-ink-soft">
          <p className="mb-3">{waiver.intro}</p>
          <ol className="list-decimal space-y-2.5 pl-4">
            {waiver.clauses.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl bg-ink/5 p-3 text-[12px] font-medium text-ink">
            {waiver.acknowledgement}
          </p>
          <p className="mt-3 text-[12px] text-ink-faint">{waiver.minorNote}</p>
        </div>

        <div className="border-t border-line p-5">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            Type your full name to sign
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full legal name"
            className="hairline mb-3 w-full rounded-xl bg-white/70 px-3 py-2.5 font-display text-lg text-ink outline-none focus:bg-white"
          />
          <label className="mb-4 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-ink"
            />
            <span className="text-[12.5px] leading-snug text-ink-soft">
              I have read and agree to the release of liability and assumption of risk, and I am 18+
              or signing as the parent/guardian of all paddlers.
            </span>
          </label>
          <button
            disabled={!canSign}
            onClick={() => onSign(name.trim())}
            className="btn-ink w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            {canSign ? 'Sign waiver' : 'Type your name & agree to sign'}
          </button>
        </div>
      </div>
    </div>
  )
}
