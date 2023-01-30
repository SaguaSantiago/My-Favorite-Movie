import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { discoverRequest } from 'api/discoverRequest'

const servicesArr = [
  'Netflix',
  'Amazon Prime Video',
  'Disney Plus',
  'HBO Max',
  'Peacock',
  'Peacock Premium',
  'Paramount+',
  'Starz Play Amazon Channel',
  'Showtime Amazon Channel"',
  'Apple TV Plus',
  'MUBI',
  'Funimation Now',
  'iPlayer',
  'BritBox',
  'Curiosity Stream',
]

const initialValue = {
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
  availableGenres: [],
  countryServices: [],
  params: {
    type: 'movie',
    country: '',
    genresSelected: [],
    servicesToSearch: [],
    pageToSearch: 1,
    keywords: '',
    language: '',
    sortBy: ''
  },
  movies: {
    actualPage: 0,
    total_pages: 0,
    results: [],
  },
}

// redux request to discover movies //

export const getAllMovies = createAsyncThunk(
  'movie/getAllMovies',
  async (formParams, { getState, requestId }) => {
    const { currentRequestId, loading, params } = getState().movies

    if (currentRequestId !== requestId || loading !== 'pending') {
      return
    }

    const { country, keywords, servicesToSearch, genresSelected, pageToSearch } = params

    let genresString = encodeURIComponent(genresSelected.map(({ id }) => `${id}`).join(','))
    let keywordsString = keywords && encodeURIComponent(keywords.join(','))
    let providersString = encodeURIComponent(
      servicesToSearch.map(({ provider_id }) => provider_id).join(','),
    )

    return discoverRequest({
      page: pageToSearch,
      genres: genresString || '',
      keywords: keywordsString || '',
      region: country,
      providers: providersString || '',
      ...params,
    })
  },
)

// slice for handling discover request and request parameters //

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialValue,
  reducers: {

    // get all provider/services for each region specified

    getServices(state, action) {
      action.payload.forEach((service) => {
        if (
          servicesArr.includes(service.provider_name) &&
          !state.countryServices.some((srv) => srv.provider_name === service.provider_name)
        ) {
          state.countryServices = [...state.countryServices, service]
        }
      })
    },

    // get the specific service to search

    toggleServiceToSearch(state, action) {
      const isAlreadyIn = state.params.servicesToSearch.some(
        (srv) => srv.provider_id === action.payload.provider_id,
      )

      if (!isAlreadyIn) {
        state.params.servicesToSearch.push(action.payload)
      } else {
        state.params.servicesToSearch = state.params.servicesToSearch.filter(
          (e) => e.provider_id !== action.payload.provider_id,
        )
      }
    },

    // get the genres availables for movies or tv 
    // depending what is the specified in the parameters

    addAvailableGenres(state, action) {
      state.availableGenres = action.payload
    },

    // add the genre to search

    addGenre(state, action) {
      const { payload } = action
      const isNotIncluded = state.params.genresSelected.some((g) => g.id === payload.id)

      if (!isNotIncluded) {
        state.params.genresSelected = [...state.params.genresSelected, payload]
      }
    },

    //remove the genre to search

    deleteGenre(state, action) {
      state.params.genresSelected = state.params.genresSelected.filter(
        (genre) => genre.id !== action.payload,
      )
    },

    // select a specific country, to store the region

    getCountry(state, action) {
      state.params.country = action.payload
    },

    // toggle between tv or movie types

    toggleType(state, action) {
      state.params.type = action.payload
      state.params.genresSelected = []
      state.params.sortBy = ''
    },

    // change page of search results

    changePageToSearch(state, action) {
      state.params.pageToSearch = action.payload
    },

    // get the keywords id

    setKeywords(state, action) {
      state.params.keywords = action.payload.filter((e) => e !== null)
    },

    // select a specific language to search

    setLanguage(state, action) {
      state.params.language = action.payload
    },

    //change the sort order of search results

    changeSortFilter (state, action) {
      state.params.sortBy = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      const { requestId } = action.meta
      if (
        state.loading === 'pending' &&
        state.currentRequestId === requestId &&
        action.payload !== undefined
      ) {
        state.loading = 'idle'
        state.movies = {
          ...action.payload,
          actualPage: action.payload.page,
          results: action.payload.results,
        }
        state.currentRequestId = undefined
      }
    })

    builder.addCase(getAllMovies.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    })

    builder.addCase(getAllMovies.rejected, (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        console.log(action.error)
        state.currentRequestId = undefined
      }
    })
  },
})

// destructuring reducer 
const { reducer } = moviesSlice

// export all non-asynchronous actions
export const {
  getServices,
  getServiceToSearch,
  addGenre,
  deleteGenre,
  getCountry,
  addAvailableGenres,
  toggleServiceToSearch,
  toggleType,
  changePageToSearch,
  setKeywords,
  setLanguage,
  changeSortFilter
} = moviesSlice.actions

export default reducer
