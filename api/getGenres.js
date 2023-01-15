import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const getGenresForMovie = axios
  .get('https://api.themoviedb.org/3/genre/movie/list', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  })
  .then((res) => res.data)
  .catch((error) => console.log(error))
