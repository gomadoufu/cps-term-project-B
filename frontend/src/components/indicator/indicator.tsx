import { useFrame, Vector3 } from '@react-three/fiber'
import { FC, useRef } from 'react'
import type { Mesh } from 'three'

type Props = {
  position: Vector3
  size: Vector3
  color: string
  index: number
}

const Indicator: FC<Props> = ({ position, size, color, index }) => {
  const objectRef = useRef<Mesh>(null)
  useFrame(() => {
    const object = objectRef.current
    if (!object) return
    else {
      object.rotation.x += 0.01
      object.rotation.y += 0.01
      switch (index % 4) {
        case 0:
          object.position.x += 0.01
          object.position.y += 0.01
          object.position.z -= 0.01
          break
        case 1:
          object.position.x -= 0.01
          object.position.y += 0.01
          object.position.z += 0.01
          break
        case 2:
          object.position.x += 0.01
          object.position.y -= 0.01
          object.position.z -= 0.01
          break
        case 3:
          object.position.x -= 0.01
          object.position.y -= 0.01
          object.position.z += 0.01
          break
      }

      if (object.position.x > 100 || object.position.x < -100)
        object.position.x = object.position.x - 50
      if (object.position.y > 100 || object.position.y < -100)
        object.position.y = object.position.y - 50
      if (object.position.z > 100 || object.position.z < -100)
        object.position.z = object.position.z - 50
    }
  })

  return (
    <mesh ref={objectRef} position={position}>
      <boxBufferGeometry args={size} />
      <meshLambertMaterial color={color} />
    </mesh>
  )
}

export default Indicator
