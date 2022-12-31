import { useEffect, useState } from 'react'

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    mediaQueryList.addListener(onChange)

    setMatches(mediaQueryList.matches)

    return () => mediaQueryList.removeListener(onChange)
  }, [query])

  return matches
}
