import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { discoverRequest } from 'api/discoverRequest'
import { getMoviesRequest } from 'modules'

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
  country: '',
  availableGenres: [],
  countryServices: [],
  data: {
    genresSelected: [],
    servicesToSearch: [],
  },
  movies: [],
}

export const getAllMovies = createAsyncThunk(
  'movie/getAllMovies',
  async (params, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().movies
    // console.log(params)
    if (currentRequestId !== requestId || loading !== 'pending') {
      return
    }
    const { genresSelected, keywords, country, servicesToSearch, ...rest } = params

    let genresString = encodeURIComponent(genresSelected.map(({ id }) => `${id}`).join(','))
    let keywordsString = encodeURIComponent(keywords.split(' ').join(','))
    let providersString = encodeURIComponent(
      servicesToSearch.map(({ provider_id }) => provider_id).join(','),
    )

    return discoverRequest({
      ...rest,
      genres: genresString || '',
      keywords: keywordsString || '',
      region: country,
      providers: providersString || '',
    })
  },
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialValue,
  reducers: {
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
    toggleServiceToSearch(state, action) {
      const isAlreadyIn = state.data.servicesToSearch.some(
        (srv) => srv.provider_id === action.payload.provider_id,
      )

      if (!isAlreadyIn) {
        state.data.servicesToSearch.push(action.payload)
      } else {
        state.data.servicesToSearch = state.data.servicesToSearch.filter(
          (e) => e.provider_id !== action.payload.provider_id,
        )
      }
    },
    addAvailableGenres(state, action) {
      state.availableGenres = action.payload
    },
    addGenre(state, action) {
      const { payload } = action
      const isNotIncluded = state.data.genresSelected.some((g) => g.id === payload.id)

      if (!isNotIncluded) {
        state.data.genresSelected = [...state.data.genresSelected, payload]
      }
    },
    deleteGenre(state, action) {
      state.data.genresSelected = state.data.genresSelected.filter(
        (genre) => genre.id !== action.payload,
      )
    },
    getCountry(state, action) {
      state.country = action.payload
    },
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
        state.movies = action.payload.results
          .filter((movieInput) => !state.movies.some((e) => e.id === movieInput.id))
          .concat(state.movies)
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
const { reducer } = moviesSlice
export const {
  getServices,
  getServiceToSearch,
  addGenre,
  deleteGenre,
  getCountry,
  addAvailableGenres,
  toggleServiceToSearch,
} = moviesSlice.actions

export default reducer
