import { useState, useEffect, useContext } from 'react'

import { getKeywordsRequest } from 'api/getKeywords'
import { getLanguagesRequest } from 'api/getLanguages'

import { toast } from 'react-toastify'
import { useMovies } from './useMovies'
import { FiltersContext } from 'Context/Filters'
import { useFilters } from './useFilters'

export const useLanguage = () => {
  const { filters } = useContext(FiltersContext)
  const { servicesToSearch } = filters
  const { getAllMovies } = useMovies()
  const { setKeywords } = useFilters()
  const [languages, setLenguages] = useState([])

  useEffect(() => {
    getLanguagesRequest.then((res) =>
      setLenguages(res.sort((a, b) => a.english_name.localeCompare(b.english_name))),
    )
  }, [])

  const handleSubmit = () => {
    if (servicesToSearch.length === 0) {
      toast.error('Please select at least one service', {
        position: 'bottom-right',
        hideProgressBar: true,
        pauseOnHover: false,
        closeOnClick: true,
      })
    } else {
      getAllMovies()
    }
  }

  const handleKeywordsChange = (e) => {
    const inputValueArr = e.target.value.trim().split(',')
    const valuesPromises = inputValueArr.map((keyword) => getKeywordsRequest(keyword))
    Promise.allSettled(valuesPromises).then((res) => {
      setKeywords(
        res.map((keyword) => {
          if (keyword.status === 'fulfilled' && keyword.value !== undefined) {
            return keyword.value.id
          } else {
            return null
          }
        }),
      )
    })
  }

  return {
    languages,
    handleKeywordsChange,
    handleSubmit,
  }
}
