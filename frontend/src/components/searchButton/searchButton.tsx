import React, { useCallback } from 'react'

import type { SongFeature } from '@/types'

import styles from '../../styles/searchPage.module.css'

type Props = {
  baseUrl: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const SearchButton = (props: Props) => {
  const onClickButton = useCallback(() => {
    fetch(props.baseUrl + 'health', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        alert(data.name)
        props.setState(data.name)
      })
  }, [props])

  return (
    <div className={styles.button} onClick={onClickButton}>
      検索
    </div>
  )
}

export default SearchButton
