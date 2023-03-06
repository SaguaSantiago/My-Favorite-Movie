import { useState, useEffect } from 'react'

import { getKeywordsRequest } from 'api/getKeywords'
import { getLanguagesRequest } from 'api/getLanguages'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { getAllMovies, setKeywords } from 'redux/reducers/movies'

export const useLanguage = () => {
  const { servicesToSearch } = useSelector((state) => state.movies.params)
  const [languages, setLenguages] = useState([])
  const dispatch = useDispatch()

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
      dispatch(getAllMovies())
    }
  }

  const handleKeywordsChange = (e) => {
    const inputValueArr = e.target.value.trim().split(',')
    const valuesPromises = inputValueArr.map((keyword) => getKeywordsRequest(keyword))
    Promise.allSettled(valuesPromises).then((res) => {
      dispatch(
        setKeywords(
          res.map((keyword) => {
            if (keyword.status === 'fulfilled' && keyword.value !== undefined) {
              return keyword.value.id
            } else {
              return null
            }
          }),
        ),
      )
    })
  }

  return {
    languages,
    handleKeywordsChange,
    handleSubmit,
  }
}
