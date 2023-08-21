import { API_KEY } from 'Utilities/API_KEY'
import axios from 'axios'

export const getPersonMovieCredits = ({ id }) => {
  return axios
    .get(`https://api.themoviedb.org/3/person/${id}/movie_credits`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then((res) => {
      return res.data.cast
    })
    .catch((err) => err)
}

export const getPersonTvCredits = ({ id }) => {
  return axios
    .get(`https://api.themoviedb.org/3/person/${id}/tv_credits`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then((res) => {
      return res.data.cast
    })
    .catch((err) => err)
}

export const getPersonDetails = ({ id }) => {
  return axios
    .get(`https://api.themoviedb.org/3/person/${id}`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getPersonImages = ({ id }) => {
  return axios
    .get(`https://api.themoviedb.org/3/person/${id}/images`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}
