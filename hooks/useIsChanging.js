import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useIsChanging = (callback) => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      callback(true)
    })
    router.events.on('routeChangeComplete', (url) => {
      callback(false)
    })
  }, [])
}
