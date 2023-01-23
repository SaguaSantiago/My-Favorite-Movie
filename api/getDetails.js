import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

const OPTIONS = {
  params: {
    api_key: API_KEY,
  },
}

export const getDetailsRequest = (id, type) => [
  axios
    .get(`https://api.themoviedb.org/3/${type}/${id}`, OPTIONS)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  axios
    .get(`https://api.themoviedb.org/3/${type}/${id}/recommendations`, OPTIONS)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
    axios
    .get(`https://api.themoviedb.org/3/${type}/${id}/watch/providers`, OPTIONS)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
]