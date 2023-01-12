import { useFrame, Vector3 } from '@react-three/fiber'
import { FC, useRef } from 'react'
import type { Mesh } from 'three'

type Props = {
  position: Vector3
  size: Vector3
  color: string
}

const Cube: FC<Props> = ({ position, size, color }) => {
  const cubeRef = useRef<Mesh>(null)
  useFrame(() => {
    const cube = cubeRef.current
    if (!cube) return
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  })

  return (
    <mesh ref={cubeRef} position={position}>
      <boxBufferGeometry args={size} />
      <meshLambertMaterial color={color} />
    </mesh>
  )
}

export default Cube
