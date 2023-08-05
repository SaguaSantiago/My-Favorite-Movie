import { API_KEY } from 'Utilities/API_KEY'
import axios from 'axios'

export const getCredits = ({ type, id }) => {
  return axios
    .get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`)
    .then((res) => res.data.cast)
    .catch((err) => console.error(err))
}
