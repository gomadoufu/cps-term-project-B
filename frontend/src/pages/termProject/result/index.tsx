import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { Suspense } from 'react'

import Jacket from '@/components/CDJacket/CDJacket'
import Indicator from '@/components/indicator/indicator'
import Text3DObject from '@/components/text3DObject/text3DObject'

const Result: NextPage = () => {
  const router = useRouter()
  const title = router.query.title as string
  const ImageURL = router.query.image as string
  const danceability = router.query.danceability as unknown as number
  const energy = router.query.energy as unknown as number

  console.log(title)
  console.log(ImageURL)
  console.log(danceability)
  console.log(energy)

  function setColor() {
    const color = ((Math.random() * 0xffffff) | 0).toString(16)
    const randomColor = '#' + ('000000' + color).slice(-6)
    return randomColor
  }

  function setArraySize(danceability: number) {
    let size = 0
    danceability < 0.2
      ? (size = 100)
      : danceability < 0.4
      ? (size = 200)
      : danceability < 0.6
      ? (size = 300)
      : danceability < 0.8
      ? (size = 400)
      : (size = 500)
    const array = [...Array(size)].map((_, i) => i)
    return array
  }
  return (
    <div
      className={`w-screen h-screen  ${
        energy < 0.2
          ? 'bg-gradient-to-br from-[#2e31d8] to-[#000000]'
          : energy < 0.4
          ? 'bg-gradient-to-br from-[#5621aa] to-[#2e31d8]'
          : energy < 0.6
          ? 'bg-gradient-to-br from-[#b594db] to-[#5621aa]'
          : energy < 0.8
          ? 'bg-gradient-to-br from-[#df67ad] to-[#b594db]'
          : 'bg-gradient-to-br from-[#ee0000] to-[#df67ad]'
      }`}
    >
      <div className="h-full w-full absolute z-0">
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [0, 0, 100],
          }}
        >
          <directionalLight position={[1, 1, 1]} intensity={0.8} />
          <ambientLight args={[0xffffff]} intensity={0.2} />
          <Suspense fallback={null}>
            <Jacket position={[0, 0, 0]} ImageURL={ImageURL}></Jacket>
          </Suspense>
          {setArraySize(danceability).map((num) => (
            <Indicator
              key={num}
              position={[
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
              ]}
              size={[1, 1, 1]}
              color={setColor()}
              index={Math.floor(Math.random() * 10)}
            />
          ))}
          <Text3DObject position={[0, 0, 5]} text={title} size={3} color={'black'}></Text3DObject>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

export default Result
