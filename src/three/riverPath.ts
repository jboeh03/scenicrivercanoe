import * as THREE from 'three'

// River centerline — winds in X while heading into the distance (-Z).
const CENTER_POINTS = [
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(3.2, 0, 1),
  new THREE.Vector3(-2.4, 0, -6),
  new THREE.Vector3(3.0, 0, -13),
  new THREE.Vector3(-3.2, 0, -20),
  new THREE.Vector3(2.2, 0, -27.5),
  new THREE.Vector3(-1.6, 0, -35),
  new THREE.Vector3(1.2, 0, -43),
  new THREE.Vector3(-0.5, 0, -51),
]

export const riverCurve = new THREE.CatmullRomCurve3(CENTER_POINTS, false, 'catmullrom', 0.5)

const UP = new THREE.Vector3(0, 1, 0)

/** Flat water ribbon following the curve. */
export function buildRiverRibbon(width = 3.4, steps = 240): THREE.BufferGeometry {
  const half = width / 2
  const pos: number[] = []
  const idx: number[] = []
  const tmpT = new THREE.Vector3()
  const tmpN = new THREE.Vector3()

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const p = riverCurve.getPointAt(t)
    riverCurve.getTangentAt(t, tmpT)
    tmpN.crossVectors(tmpT, UP).normalize() // lateral
    // gentle width variation
    const w = half * (0.85 + 0.3 * Math.sin(t * 22))
    pos.push(p.x + tmpN.x * w, 0, p.z + tmpN.z * w)
    pos.push(p.x - tmpN.x * w, 0, p.z - tmpN.z * w)
    if (i < steps) {
      const a = i * 2
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setIndex(idx)
  geo.computeVertexNormals()
  return geo
}

export type Scatter = { pos: [number, number, number]; scale: number; rot: number; kind: 0 | 1 }

/** Deterministic pseudo-random scatter of trees/rocks along both banks. */
export function buildScatter(count = 90, width = 3.4): Scatter[] {
  let s = 1337
  const rng = () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 10000) / 10000
  }
  const out: Scatter[] = []
  const tmpT = new THREE.Vector3()
  const tmpN = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    const t = rng()
    const p = riverCurve.getPointAt(t)
    riverCurve.getTangentAt(t, tmpT)
    tmpN.crossVectors(tmpT, UP).normalize()
    const side = rng() > 0.5 ? 1 : -1
    const dist = width / 2 + 0.8 + rng() * 7
    const jitter = (rng() - 0.5) * 1.2
    out.push({
      pos: [p.x + tmpN.x * dist * side + jitter, 0, p.z + tmpN.z * dist * side + jitter],
      scale: 0.55 + rng() * 1.5,
      rot: rng() * Math.PI * 2,
      kind: rng() > 0.45 ? 0 : 1, // 0 = pine, 1 = round
    })
  }
  return out
}
