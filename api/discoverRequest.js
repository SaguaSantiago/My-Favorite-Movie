import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const discoverRequest = (params) => {
  const { language, genres, region, type, keywords, providers, page } = params
  const URL = `https://api.themoviedb.org/3/discover/${type === 'serie' ? 'tv' : 'movie'}`
  console.log(URL)
  return axios
    .get(URL, {
      params: {
        api_key: API_KEY,
        language: language,
        watch_region: region,
        with_watch_providers: providers,
        'with_runtime.gte': '',
        with_genres: genres,
        with_keywords: keywords,
        page: page,
        include_adult: '',
        sort_by: '',
        region: region,
      },
    })
    .then((res) => res.data)
}
