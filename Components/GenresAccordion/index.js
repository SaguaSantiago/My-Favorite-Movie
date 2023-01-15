import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addGenre, deleteGenre, addAvailableGenres } from 'redux/reducers/movies'

import { getGenresForMovie } from 'api/getGenres'

import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Chip,
} from '@mui/material'
import { swapKeysValues } from 'Utilities/swapKeysValues'
// import { responseOfGenres } from 'exampleResponse'

export default function GenresAccordion() {
  const { availableGenres } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const genresSelected = useSelector((state) => state.movies.data.genresSelected)

  useEffect(() => {
    getGenresForMovie.then((res) => {
      const { genres } = res
      dispatch(addAvailableGenres(genres))
    })
    // responseOfGenres.then((res) => setGenres(res))
  }, [])

  return (
    <Accordion>
      <AccordionSummary
        sx={{ background: '#525252', color: 'white' }}
        expandIcon={<ExpandMoreOutlined />}
      >
        <Typography textAlign='center'>
          {genresSelected && genresSelected.length === 0
            ? 'Genres'
            : genresSelected.map(({ id, name }) => (
                <Chip
                  key={id}
                  label={name}
                  sx={{ color: '#cccccc' }}
                  onClick={() => dispatch(deleteGenre(id))}
                  onDelete={() => dispatch(deleteGenre(id))}
                />
              ))}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        component='div'
        sx={{ background: '#525252', color: 'white', borderTop: '1px solid #bbbbbb' }}
      >
        <Grid container gap={1} justifyContent='center'>
          {availableGenres &&
            availableGenres.map(({ id, name }) => (
              <Chip
                key={id}
                sx={{ color: '#cfcfcf' }}
                onClick={() => dispatch(addGenre({ id, name }))}
                label={name}
              />
            ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
