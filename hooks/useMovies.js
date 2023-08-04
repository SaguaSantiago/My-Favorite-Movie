import { useContext, useEffect, useState } from 'react'
import { MoviesContext } from 'Context/Movies'
import { FiltersContext } from 'Context/Filters'
import { discoverRequest } from 'api/discoverRequest'
import { useRouter } from 'next/router'

export const useMovies = () => {
  const { state, setState } = useContext(MoviesContext)
  const { filters } = useContext(FiltersContext)
  const router = useRouter()
  const [isChangingPage, setChangingPage] = useState(false)

  const getAllMovies = () => {
    const { country, keywords, servicesToSearch, genresSelected, pageToSearch } = filters

    let genresString = encodeURIComponent(genresSelected.map(({ id }) => `${id}`).join(','))
    let keywordsString = keywords && encodeURIComponent(keywords.join(','))
    let providersString = encodeURIComponent(
      servicesToSearch.map(({ provider_id }) => provider_id).join(','),
    )

    discoverRequest({
      page: pageToSearch,
      genres: genresString || '',
      keywords: keywordsString || '',
      region: country,
      providers: providersString || '',
      ...filters,
    }).then((res) => {
      setState((s) => ({
        ...s,
        movies: {
          results: res.results,
          actualPage: res.page,
          total_pages: res.total_pages,
        },
      }))
    })
  }

  useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      setChangingPage(true)
    })
    router.events.on('routeChangeComplete', (url) => {
      setChangingPage(false)
    })
  }, [])

  return { getAllMovies, isChangingPage }
}
