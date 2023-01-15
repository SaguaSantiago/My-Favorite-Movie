import axios from "axios";

const API_KEY = '77f5b40abce26bb68b5882b745806b38'

export const getGenresForMovie = axios.get('https://api.themoviedb.org/3/genre/movie/list', {
  params: {
    api_key: API_KEY,
    language:'en-US'
  }
})
.then(res => res.data)
.catch(error => console.log(error))