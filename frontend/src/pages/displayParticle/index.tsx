import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { NextPage } from 'next'

import Particle from '@/components/particle/particle'

const DisplayCube: NextPage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#767995] to-[#050725]">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
        }}
      >
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ambientLight args={[0xffffff]} intensity={0.2} />
        <Particle />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default DisplayCube
