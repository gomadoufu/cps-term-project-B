import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

import styles from '../../styles/searchPage.module.css'

type Props = {
  baseUrl: string
  song: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const SearchButton = (props: Props) => {
  const router = useRouter()
  const onClick = useCallback(() => {
    fetch(props.baseUrl + '/feature' + '?song=' + props.song, { method: 'GET', mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        props.setState(JSON.stringify(data))
      })
    router.push('/termProject/result')
  }, [props, router])

  return (
    <div className={styles.button} onClick={onClick}>
      検索
    </div>
  )
}

export default SearchButton
