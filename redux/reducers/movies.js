import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMoviesRequest } from 'modules'

const initialValue = {
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
  countryServices: [],
  serviceToSearch: '',
  movies: [],
}

export const getAllMovies = createAsyncThunk(
  'movie/getAllMovies',
  async (arg, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().movies
    if (currentRequestId !== requestId || loading !== 'pending') {
      return
    }

    return await getMoviesRequest()
  },
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialValue,
  reducers: {
    getServices(state, action) {
      state.countryServices = action.payload
    },
    getServiceToSearch(state, action) {
      state.serviceToSearch = action.payload
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
        state.movies.push(...action.payload.results)

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
        state.currentRequestId = undefined
      }
    })
  },
})
const { reducer } = moviesSlice
export const { getServices, getServiceToSearch } = moviesSlice.actions
export default reducer
