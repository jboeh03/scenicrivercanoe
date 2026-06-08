// Modernized navy + gold reinterpretation of the Scenic River badge.
// LogoMark = clean icon for nav / favicon (reads well at small sizes).
// LogoBadge = full circular badge with arced lettering for showcase / "after".

const NAVY = '#16183a'
const GOLD = '#e0b13a'

export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Scenic River"
    >
      <circle cx="50" cy="50" r="49" fill={NAVY} />
      <circle cx="50" cy="50" r="43" fill="none" stroke={GOLD} strokeWidth="1.6" opacity="0.9" />
      {/* canoe hull */}
      <path
        d="M20 45 Q50 31 80 45 Q50 53 20 45 Z"
        fill="none"
        stroke={GOLD}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <line x1="50" y1="38" x2="50" y2="48.5" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      {/* river waves */}
      <path
        d="M22 62 q7 -5 14 0 t14 0 t14 0 t14 0"
        fill="none"
        stroke={GOLD}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M26 71 q6 -4.5 12 0 t12 0 t12 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

export function LogoBadge({ size = 160, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Scenic River Canoe Excursions"
    >
      <defs>
        <path id="arc-top" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
        <path id="arc-bottom" d="M 36 100 A 64 64 0 0 0 164 100" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={NAVY} />
      <circle cx="100" cy="100" r="88" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle cx="100" cy="100" r="60" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5" />

      <text fill={GOLD} fontSize="18" fontWeight="700" letterSpacing="3" fontFamily="Bricolage Grotesque, sans-serif">
        <textPath href="#arc-top" startOffset="50%" textAnchor="middle">
          SCENIC RIVER
        </textPath>
      </text>
      <text fill={GOLD} fontSize="13" fontWeight="600" letterSpacing="4" fontFamily="Inter, sans-serif">
        <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">
          EXCURSIONS
        </textPath>
      </text>

      {/* center mark */}
      <g transform="translate(100 96)">
        <path
          d="M-40 0 Q0 -22 40 0 Q0 12 -40 0 Z"
          fill="none"
          stroke={GOLD}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <line x1="0" y1="-15" x2="0" y2="2.5" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <path
          d="M-34 22 q11 -7 22 0 t22 0 t22 0"
          fill="none"
          stroke={GOLD}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-26 33 q9 -6 18 0 t18 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>
    </svg>
  )
}
