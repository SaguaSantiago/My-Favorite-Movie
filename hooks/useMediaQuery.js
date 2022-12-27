import { useEffect, useState } from 'react'

export const useMediaQuery = (query) => {
  const [resolution, setResolution] = useState(null)
  useEffect(() => {
    window.matchMedia(query).addEventListener('change', (e) => {
      setResolution(e.matches)
    })
  }, [])

  return resolution
}
