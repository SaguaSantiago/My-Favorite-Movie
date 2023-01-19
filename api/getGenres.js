import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

const OPTIONS = {
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
}

export const getGenresForMovie = axios
  .get('https://api.themoviedb.org/3/genre/movie/list', OPTIONS)
  .then((res) => res.data)
  .catch((error) => console.log(error))

export const getGenresForSeries = axios
  .get('https://api.themoviedb.org/3/genre/tv/list', OPTIONS)
  .then((res) => res.data)
  .catch((err) => console.log(err))
