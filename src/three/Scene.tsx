import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'
import { riverCurve, buildRiverRibbon, buildScatter } from './riverPath'

const CLAY = '#ededec'
const WATER = '#dde0e9'

export function Scene() {
  const ribbon = useMemo(() => buildRiverRibbon(3.4, 240), [])
  const scatter = useMemo(() => buildScatter(96, 3.4), [])
  const pines = useMemo(() => scatter.filter((s) => s.kind === 0), [scatter])
  const rounds = useMemo(() => scatter.filter((s) => s.kind === 1), [scatter])

  return (
    <group>
      {/* soft lighting tuned for an all-white scene */}
      <hemisphereLight args={['#ffffff', '#d6d6db', 0.85]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[7, 11, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-18, 18, 18, -18, 0.1, 50]} />
      </directionalLight>

      {/* ground / shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, -20]} receiveShadow>
        <planeGeometry args={[120, 140]} />
        <meshStandardMaterial color={CLAY} roughness={0.96} />
      </mesh>

      {/* water */}
      <mesh geometry={ribbon} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial color={WATER} roughness={0.22} metalness={0.0} />
      </mesh>

      {/* pines */}
      <Instances castShadow receiveShadow limit={pines.length} range={pines.length}>
        <coneGeometry args={[0.62, 2.1, 7]} />
        <meshStandardMaterial color={CLAY} roughness={0.9} />
        {pines.map((s, i) => (
          <Instance
            key={i}
            position={[s.pos[0], s.scale * 1.05, s.pos[2]]}
            scale={[s.scale, s.scale, s.scale]}
            rotation={[0, s.rot, 0]}
          />
        ))}
      </Instances>

      {/* round trees */}
      <Instances castShadow receiveShadow limit={rounds.length} range={rounds.length}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color={CLAY} roughness={0.92} />
        {rounds.map((s, i) => (
          <Instance
            key={i}
            position={[s.pos[0], s.scale * 0.8, s.pos[2]]}
            scale={[s.scale * 0.9, s.scale, s.scale * 0.9]}
            rotation={[0, s.rot, 0]}
          />
        ))}
      </Instances>

      <Canoe />
    </group>
  )
}

function Canoe() {
  const ref = useRef<THREE.Group>(null)
  // place the canoe near the start of the run, oriented along the river tangent
  const { pos, yaw } = useMemo(() => {
    const t = 0.08
    const p = riverCurve.getPointAt(t)
    const tan = riverCurve.getTangentAt(t)
    return { pos: p, yaw: Math.atan2(tan.x, tan.z) }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const e = state.clock.elapsedTime
    ref.current.position.y = 0.16 + Math.sin(e * 1.3) * 0.04
    ref.current.rotation.z = Math.sin(e * 0.9) * 0.04
  })

  return (
    <group ref={ref} position={[pos.x, 0.16, pos.z]} rotation={[0, yaw, 0]}>
      {/* hull — squashed capsule lying along the river reads as a canoe */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]} scale={[0.55, 1, 0.5]}>
        <capsuleGeometry args={[0.42, 1.7, 6, 16]} />
        <meshStandardMaterial color="#f3f3f2" roughness={0.85} />
      </mesh>
      {/* thwarts */}
      {[-0.45, 0.45].map((z) => (
        <mesh key={z} position={[0, 0.12, z]} castShadow>
          <boxGeometry args={[0.42, 0.05, 0.07]} />
          <meshStandardMaterial color="#e7e7e6" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}
