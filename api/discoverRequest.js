import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const discoverRequest = (params) => {
  const { language, genres, region, type, keywords, providers } = params
  console.log(params)
  return axios
    .get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: API_KEY,
        language: language,
        watch_region: region,
        with_watch_providers: providers,
        'with_runtime.gte': '',
        with_genres: genres,
        with_keywords: '',
        page: '',
        include_adult: '',
        sort_by: '',
        region: region,
      },
    })
    .then((res) => res.data)
}
