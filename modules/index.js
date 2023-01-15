import axios from 'axios'

// search movies request

const API_KEY = '77f5b40abce26bb68b5882b745806b38'

const URL =
  'https://streaming-availability.p.rapidapi.com/search/basic?api_key=abd61d90a3mshf4d011a6deea603p114204jsnb4bf34bc65b'

export const getMoviesRequest = async (params) => {
  const { type, country, genre, language, serviceToSearch, keyword } = params
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
      country: country,
      service: serviceToSearch,
      type: type || 'movie',
      genre: '',
      page: '1',
      output_language: 'en',
      language: language || 'en',
      keyword: keyword || '',
    },
    headers: {
      'X-RapidAPI-Key': 'abd61d90a3mshf4d011a6deea603p114204jsnb4bf34bc65b8',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  }

  return axios
    .request(options)
    .then((res) => {
      console.log(res)
      return res.data
    })
    .catch((error) => console.error(error))
}

//get genres

//get countries
//https://streaming-availability.p.rapidapi.com/countries

const COUNTRIES_OPTIONS = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/countries',
  headers: {
    'X-RapidAPI-Key': 'abd61d90a3mshf4d011a6deea603p114204jsnb4bf34bc65b8',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  },
}

export const getServiceForCountry = axios
  .request(COUNTRIES_OPTIONS)
  .then((res) => res.data)
  .catch((error) => {
    console.error(error)
  })
