import React, { useCallback } from 'react'

import type { SongFeature } from '@/types'

import styles from '../../styles/searchPage.module.css'

type Props = {
  baseUrl: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const SearchButton = (props: Props) => {
  const callback = () => {
    fetch(props.baseUrl + '/health', { method: 'GET', mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        props.setState(data.SongName)
      })
  }

  return (
    <div className={styles.button} onClick={callback}>
      検索
    </div>
  )
}

export default SearchButton
