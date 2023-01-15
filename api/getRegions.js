import axios from "axios";
import { API_KEY } from "Utilities/API_KEY";

export const getRegions = axios.get(
    'https://api.themoviedb.org/3/watch/providers/regions', {
        params: {
            language: 'en-US',
            api_key : API_KEY
        }
    }).then(res => res.data.results)