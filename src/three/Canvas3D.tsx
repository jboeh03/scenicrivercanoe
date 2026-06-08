import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, N8AO, SMAA } from '@react-three/postprocessing'
import { Scene } from './Scene'
import { CameraRig } from './CameraRig'

export function Canvas3D() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0, 3, 12], fov: 44, near: 0.1, far: 140 }}
      frameloop="always"
    >
      <color attach="background" args={['#f4f4f2']} />
      {/* fog gives the all-white scene depth — pure white would flatten it */}
      <fog attach="fog" args={['#f4f4f2', 10, 48]} />

      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
        flipflops={3}
      />

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <CameraRig />

      <EffectComposer enableNormalPass multisampling={0}>
        {/* N8AO halos far less than SSAO on smooth monochrome surfaces.
            AO tinted cool (not black) for a clay look. */}
        <N8AO color="#3a3a44" aoRadius={2.2} intensity={2.4} distanceFalloff={1} halfRes />
        <SMAA />
      </EffectComposer>
    </Canvas>
  )
}
