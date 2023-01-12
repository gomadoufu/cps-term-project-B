//参照：https://ramble.impl.co.jp/2251/?utm_source=rss&utm_medium=rss&utm_campaign=%25e3%2580%2590react-three-js%25e3%2580%2591react%25e3%2581%25a7%25e3%2583%25aa%25e3%2583%2583%25e3%2583%2581%25e3%2581%25aa%25e3%2582%25b5%25e3%2582%25a4%25e3%2583%2588%25e4%25bd%259c%25e3%2582%258a%25e3%2581%259f%25e3%2581%2584%25e3%2580%2582

import { useFrame } from '@react-three/fiber'
import { FC, useMemo } from 'react'
import * as THREE from 'three'

import { vertexShader, fragmentShader } from './shader'

const Particle: FC = () => {
  let frame = 0

  const planePositions = useMemo(() => {
    const planeGeometry = new THREE.PlaneGeometry(6, 6, 128, 128)
    const positions = planeGeometry.attributes.position.array
    return positions
  }, [])

  // shaderの設定
  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    }),
    []
  )

  const vec = new THREE.Vector3()
  useFrame((state) => {
    shaderArgs.uniforms.uTime.value++
    // カメラを徐々に手前に遠ざける
    frame < 5 && (frame += 0.005)
    state.camera.position.lerp(vec.set(0, 0, frame), 0.1)
    state.camera.updateProjectionMatrix()
  })

  const PlaneGeometry = () => (
    <>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={planePositions}
          itemSize={3}
          count={planePositions.length / 3}
        />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} depthTest={false} depthWrite={false} />
    </>
  )

  // モヤモヤがクロスするよう2つ描画する
  return (
    <>
      <points rotation={[-Math.PI / 3, 1, 3]}>
        <PlaneGeometry />
      </points>
      <points rotation={[-Math.PI / -3, 1, -3]}>
        <PlaneGeometry />
      </points>
    </>
  )
}

export default Particle
