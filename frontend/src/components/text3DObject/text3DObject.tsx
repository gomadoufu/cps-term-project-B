import { Center, Text3D } from '@react-three/drei'
import { useFrame, Vector3 } from '@react-three/fiber'
import React, { FC, useRef } from 'react'
import { Mesh } from 'three'

type Props = {
  position: Vector3
  text: string
  size: number
  color: string
}

const Text3DObject: FC<Props> = ({ position, text, size, color }) => {
  const textRef = useRef<Mesh>(null)
  useFrame(() => {
    const text = textRef.current
    if (!text) return
  })

  return (
    <Center position={position}>
      <Text3D
        ref={textRef}
        letterSpacing={-0.06}
        size={size}
        font="/font.json"
        curveSegments={32}
        bevelEnabled
        bevelSize={0.02}
      >
        {text}
        <meshStandardMaterial color={color} />
      </Text3D>
    </Center>
  )
}

export default Text3DObject
