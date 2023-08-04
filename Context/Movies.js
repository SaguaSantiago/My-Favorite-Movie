import { createContext, useState } from 'react'

export const MoviesContext = createContext()

export default function MoviesProvider({ children }) {
  const [state, setState] = useState({
    loading: 'idle',
    error: null,
    movies: {
      actualPage: 0,
      total_pages: 0,
      results: [],
    },
  })
  return <MoviesContext.Provider value={{ state, setState }}>{children}</MoviesContext.Provider>
}
