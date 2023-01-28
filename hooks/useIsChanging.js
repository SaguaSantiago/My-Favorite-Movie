import { useEffect } from "react"

export const useIsChanging = () => {
  useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      setChangingPage(true)
    })
    router.events.on('routeChangeComplete', (url) => {
      setChangingPage(false)
    })
  }, [])
}
