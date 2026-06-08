// A decorative QR-style code generated deterministically from a seed string.
// Not a scannable QR — it's a high-fidelity prop for the booking demo.
function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function QrPlaceholder({ size = 150, seed = 'SRC' }: { size?: number; seed?: string }) {
  const n = 21
  const cell = size / n
  let state = hash(seed)
  const rng = () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return ((state >>> 0) % 1000) / 1000
  }

  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, n - 7) || inBox(n - 7, 0)
  }
  const finderOn = (r: number, c: number) => {
    const local = (br: number, bc: number) => {
      const lr = r - br
      const lc = c - bc
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true
      if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true
      return false
    }
    if (r < 7 && c < 7) return local(0, 0)
    if (r < 7 && c >= n - 7) return local(0, n - 7)
    if (r >= n - 7 && c < 7) return local(n - 7, 0)
    return false
  }

  const cells: { x: number; y: number }[] = []
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const on = isFinder(r, c) ? finderOn(r, c) : rng() > 0.5
      if (on) cells.push({ x: c * cell, y: r * cell })
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Check-in QR code">
      {cells.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={cell + 0.5}
          height={cell + 0.5}
          rx={cell * 0.18}
          fill="#15131a"
        />
      ))}
    </svg>
  )
}
