import { useFrame, useLoader, Vector3 } from '@react-three/fiber'
import { FC, useRef } from 'react'
import type { Mesh } from 'three'
import { Euler, TextureLoader } from 'three/src/Three'

type Props = {
  ImageURL: string
  position: Vector3
}

const Jacket: FC<Props> = ({
  ImageURL = 'https://i.scdn.co/image/ab67616d0000b273ec7a33f5867fc840bf19d3fb',
  position,
}) => {
  const jacketRef = useRef<Mesh>(null)
  let isRightMove = true
  useFrame(() => {
    const jacket = jacketRef.current
    if (!jacket) return
    else {
      const e = new Euler().setFromQuaternion(jacket.quaternion)
      if (e.z > 0.3) isRightMove = false
      if (e.z < -0.3) isRightMove = true
      isRightMove ? (jacket.rotation.z += 0.005) : (jacket.rotation.z -= 0.005)
      console.log(e)
      console.log(isRightMove)
    }
  })

  const map = useLoader(TextureLoader, ImageURL)

  return (
    <mesh ref={jacketRef} position={position} castShadow receiveShadow>
      <boxBufferGeometry args={[50, 50, 1]} />
      <meshMatcapMaterial map={map} />
    </mesh>
  )
}

export default Jacket
