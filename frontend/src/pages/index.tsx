import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    console.log('useEffect')
    router.push('/displayCube')
  }, [router])

  return null
}

export default Home
