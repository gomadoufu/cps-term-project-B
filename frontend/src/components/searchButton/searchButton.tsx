import React, { useCallback } from 'react'

import type { SongFeature } from '@/types'

import styles from '../../styles/searchPage.module.css'

type Props = {
  baseUrl: string
  song: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const SearchButton = (props: Props) => {
  const onClick = useCallback(() => {
    fetch(props.baseUrl + '/feature' + '?song=' + props.song, { method: 'GET', mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        props.setState(JSON.stringify(data))
      })
  }, [props])

  return (
    <div className={styles.button} onClick={onClick}>
      検索
    </div>
  )
}

export default SearchButton
