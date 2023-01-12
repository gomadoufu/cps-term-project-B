import { Canvas } from '@react-three/fiber'
import { NextPage } from 'next'
import React, { useCallback, useState, useEffect } from 'react'

import SearchButton from '@/components/searchButton/searchButton'
import Text3DObject from '@/components/text3DObject/text3DObject'

const Search: NextPage = () => {
  const [searchText, setSearchText] = useState('')

  const [result, setResult] = useState('')

  const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }, [])

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0A2647] to-[#91D8E4]">
      <div className="h-full w-full absolute z-0">
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [0, 0, 20],
          }}
        >
          <directionalLight position={[1, 1, 1]} intensity={0.8} />
          <ambientLight args={[0xffffff]} intensity={0.2} />
          <Text3DObject
            position={[0, 2, 0]}
            text="Spotify Danceabilty Search"
            size={1}
            color={'aqua'}
          ></Text3DObject>
        </Canvas>
      </div>
      <div className="h-full w-full absolute z-10">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="">
            <input
              value={searchText}
              onChange={onChangeText}
              className="bg-transparent border-black border-2 text-black placeholder-black"
              type="search"
              placeholder="曲名を入力"
            />
          </div>
          <SearchButton
            baseUrl={'https://c1fb-240f-6e-356a-1-608b-4ce9-316a-eaba.jp.ngrok.io/'}
            setState={setResult}
          ></SearchButton>
        </div>
      </div>
    </div>
  )
}

export default Search
