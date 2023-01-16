import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const getLanguagesRequest = axios
  .get('https://api.themoviedb.org/3/configuration/languages', {
    params: {
      api_key: API_KEY,
    },
  })
  .then((res) => res.data)
