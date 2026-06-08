import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { riverCurve } from './riverPath'
import { scrollState } from '@/scroll/scrollState'

const UP = new THREE.Vector3(0, 1, 0)

/**
 * Flies the camera down the river. Reads scroll progress from the module-level
 * singleton (no React re-renders) and damps toward the target each frame so
 * direction changes feel filmic rather than snappy.
 */
export function CameraRig() {
  const { camera } = useThree()
  const damped = useRef(0)
  const pos = useRef(new THREE.Vector3())
  const look = useRef(new THREE.Vector3())
  const tmpAhead = useRef(new THREE.Vector3())
  const tmpBack = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    // smooth the raw scroll progress
    damped.current = THREE.MathUtils.damp(damped.current, scrollState.progress, 4, delta)
    const t = THREE.MathUtils.clamp(damped.current, 0, 1) * 0.92

    const p = riverCurve.getPointAt(t)
    const ahead = riverCurve.getPointAt(Math.min(t + 0.05, 1), tmpAhead.current)

    // sit above and behind the current point, along the travel direction
    const back = tmpBack.current.copy(p).sub(ahead).normalize()
    pos.current
      .copy(p)
      .addScaledVector(back, 3.2)
      .addScaledVector(UP, 2.15)

    look.current.copy(ahead).addScaledVector(UP, 0.25)

    // gentle idle drift
    const e = performance.now() / 1000
    pos.current.x += Math.sin(e * 0.4) * 0.12
    pos.current.y += Math.sin(e * 0.55) * 0.06

    camera.position.lerp(pos.current, 1 - Math.pow(0.0001, delta))
    camera.lookAt(look.current)
  })

  return null
}
