import axios from 'axios'
import { API_KEY } from 'Utilities/API_KEY'

export const getKeywordsRequest = (input) =>
  axios
    .get('https://api.themoviedb.org/3/search/keyword', {
      params: {
        api_key: API_KEY,
        query: input,
      },
    })
    .then((res) => {
        return res.data.results.filter(keywordObject => keywordObject.name === input)[0]
    })
    .catch((err) => console.log(err))
