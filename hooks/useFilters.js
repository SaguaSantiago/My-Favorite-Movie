import { FiltersContext } from 'Context/Filters'
import { servicesArr } from 'Utilities/objects'
import { getGenresForMovie, getGenresForTv } from 'api/getGenres'
import { getServicesRequest } from 'api/getServices'
import { useContext, useEffect } from 'react'

export const useFilters = () => {
  const { filters, setFilters } = useContext(FiltersContext)
  const { servicesToSearch, type, genresSelected, countryServices, country } = filters

  // gets all services avalaibles for a region
  const getServices = async (region) => {
    try {
      const services = await getServicesRequest(region)
      const newServicesArr = services.filter((service) =>
        servicesArr.includes(service.provider_name),
      )
      setFilters((s) => ({ ...s, countryServices: newServicesArr }))
    } catch (err) {
      console.log(err)
    }
  }

  // adds or removes a services from the servicesToSearch list
  const toggleServiceToSearch = (newService) => {
    const isAlreadyIn = servicesToSearch.some((srv) => srv.provider_id === newService.provider_id)

    !isAlreadyIn
      ? setFilters((s) => ({ ...s, servicesToSearch: [...s.servicesToSearch, newService] }))
      : setFilters((s) => ({
          ...s,
          servicesToSearch: servicesToSearch.filter(
            (e) => e.provider_id !== newService.provider_id,
          ),
        }))
  }

  /** adds or removes a genre from the genresSelected list */
  const toggleGenreSelected = (genre) => {
    const isNotIncluded = !genresSelected.some((g) => g.id === genre.id)
    if (isNotIncluded) {
      setFilters((s) => ({ ...s, genresSelected: [...genresSelected, genre] }))
    } else {
      const filteredGenres = genresSelected.filter((g) => g.id !== genre.id)
      setFilters((s) => ({ ...s, genresSelected: filteredGenres }))
    }
  }

  // adds all avalaibles genres for tv or movies
  const addAvailableGenres = (genres) => {
    setFilters((s) => ({ ...s, availableGenres: genres }))
  }

  useEffect(() => {
    if (type === 'movie') {
      getGenresForMovie.then((genres) => {
        addAvailableGenres(genres)
      })
    } else {
      getGenresForTv.then((genres) => {
        addAvailableGenres(genres)
      })
    }
  }, [type])

  // toggles between tv and movie types
  const toggleType = (type) => {
    setFilters((s) => ({ ...s, type, genresSelected: [], sortBy: '' }))
  }

  /** change a simple filter from filter Context (runtime, sortBy, pageToSearch, dateLimit, language, country) */
  const changeSimpleFilter = ({ value, key }) => {
    setFilters((s) => ({ ...s, [key]: value }))
  }

  // sets keywords of the search
  const setKeywords = (keywordsArr) => {
    const filteredKeywords = keywordsArr.filter((e) => e !== null)
    changeSimpleFilter({ value: filteredKeywords, key: 'keywords' })
  }

  return {
    toggleServiceToSearch,
    getServices,
    toggleGenreSelected,
    toggleType,
    changeSimpleFilter,
    setKeywords,
  }
}
