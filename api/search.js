import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const search = (query, region) =>
  query.length > 0
    ? axios
        .get('https://api.themoviedb.org/3/search/multi', {
          params: { api_key: API_KEY, query, region: region || 'US' },
        })
        .then((res) => res.data.results)
        .catch((err) => console.log(err))
    : Promise.resolve([])
