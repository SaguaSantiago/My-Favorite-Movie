import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const discoverRequest = (params) => {
  const { language, genres, region, type, keywords, providers, page, runtime, dateLimit, sortBy } =
    params
  const URL = `https://api.themoviedb.org/3/discover/${type}`
  console.log(URL)
  return axios
    .get(URL, {
      params: {
        api_key: API_KEY,
        language: language,
        watch_region: region,
        with_watch_providers: providers,
        'with_runtime.gte': runtime,
        with_genres: genres,
        with_keywords: keywords,
        page: page,
        include_adult: '',
        sort_by: sortBy,
        region: region,
        primary_release_year: type === 'movie' ? dateLimit : '',
        first_air_date_year: type !== 'movie' ? dateLimit : '',
      },
    })
    .then((res) => res.data)
}
