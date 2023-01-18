import { useEffect } from 'react'

import CustomAccordion from 'Components/CustomComponents/CustomAccordion'

import { useDispatch, useSelector } from 'react-redux'
import { addGenre, deleteGenre, addAvailableGenres } from 'redux/reducers/movies'

import { getGenresForMovie, getGenresForSeries } from 'api/getGenres'

import { Chip } from '@mui/material'

export default function GenresAccordion() {
  const { availableGenres, type } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const genresSelected = useSelector((state) => state.movies.data.genresSelected)

  useEffect(() => {
    if (type === 'movie') {
      getGenresForMovie.then((res) => {
        const { genres } = res
        dispatch(addAvailableGenres(genres))
      })
    } else {
      getGenresForSeries.then((res) => {
        const { genres } = res
        dispatch(addAvailableGenres(genres))
      })
    }
  }, [type])

  return (
    <CustomAccordion
      selectedItems={
        genresSelected.length === 0
          ? 'Genres'
          : genresSelected.map(({ id, name }) => {
              if (availableGenres.some((g) => g.id === id)) {
                return (
                  <Chip
                    key={id + Math.random() * 1000}
                    label={name}
                    sx={{ color: '#cccccc' }}
                    onClick={() => dispatch(deleteGenre(id))}
                    onDelete={() => dispatch(deleteGenre(id))}
                  />
                )
              }
            })
      }
      items={
        availableGenres &&
        availableGenres.map(({ id, name }) => (
          <Chip
            key={id + Math.random() * 1000}
            sx={{ color: '#cfcfcf' }}
            onClick={() => dispatch(addGenre({ id, name }))}
            label={name}
          />
        ))
      }
    ></CustomAccordion>
  )
}
