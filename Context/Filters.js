import { createContext, useState } from 'react'

export const FiltersContext = createContext()

export default function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    type: 'movie',
    country: '',
    genresSelected: [],
    servicesToSearch: [],
    availableGenres: [],
    countryServices: [],
    pageToSearch: 1,
    keywords: '',
    language: '',
    sortBy: '',
    dateLimit: '',
    runtime: '',
  })
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>
  )
}
