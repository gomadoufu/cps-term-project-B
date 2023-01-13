import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

import type { SongFeature } from '@/types'

import styles from '../../styles/searchPage.module.css'

type Props = {
  baseUrl: string
  song: string
}

const SearchButton = (props: Props) => {
  const router = useRouter()

  const onClick = useCallback(() => {
    fetch(props.baseUrl + '/feature' + '?song=' + props.song, { method: 'GET', mode: 'cors' })
      .then((res) => res.json())
      .then((res) => {
        const data = res as SongFeature
        console.log(data)
        router.push({
          pathname: '/termProject/result',
          query: {
            title: data.SongName,
            image: data.ImageURL,
            danceability: data.Danceability,
            energy: data.Energy,
          },
        })
      })
  }, [props, router])

  return (
    <div className={styles.button} onClick={onClick}>
      検索
    </div>
  )
}

export default SearchButton
