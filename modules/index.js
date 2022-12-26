import axios from 'axios'

const URL =
  'https://streaming-availability.p.rapidapi.com/search/basic?api_key=abd61d90a3mshf4d011a6deea603p114204jsnb4bf34bc65b'

const MOVIES_OPTIONS = {
  method: 'GET',
  url: URL,
  params: {
    country: 'ar',
    service: 'netflix',
    type: 'movie',
    page: '2',
    output_language: 'es',
    language: 'en',
  },
  headers: {
    'X-RapidAPI-Key': 'abd61d90a3mshf4d011a6deea603p114204jsnb4bf34bc65b8',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  },
}

export const getMoviesRequest = async () => {
  return axios
    .request(MOVIES_OPTIONS)
    .then((res) => {
      return res.data
    })
    .catch((error) => error)
}

// import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/genres',
  headers: {
    'X-RapidAPI-Key': '1d53a793efmsh45fc1326eb5c50fp137b41jsn1bd80cb6a8a3',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  },
}

export const getGenres = axios
  .request(options)
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })
