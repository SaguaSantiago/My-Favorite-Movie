import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const getServicesRequest = (region) =>
  axios
    .get('https://api.themoviedb.org/3/watch/providers/tv', {
      params: { api_key: API_KEY, language: 'en-US', watch_region: region },
    })
    .then((res) => res.data.results)
