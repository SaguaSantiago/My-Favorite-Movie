import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addGenre, deleteGenre, addAvailableGenres } from 'redux/reducers/movies'

import { getGenres } from 'modules'

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
    getGenres.then((res) => {
      const finalRes = swapKeysValues(res)
      dispatch(addAvailableGenres(finalRes))
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
          {genresSelected && Object.keys(genresSelected).length === 0
            ? 'Genres'
            : Object.keys(genresSelected).map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  sx={{ color: '#cccccc' }}
                  onClick={() => dispatch(deleteGenre(genre))}
                  onDelete={() => dispatch(deleteGenre(genre))}
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
            Object.entries(availableGenres).map(([id, genre]) => (
              <Chip
                key={id}
                sx={{ color: '#cfcfcf' }}
                onClick={() => dispatch(addGenre({ [genre]: id }))}
                label={genre}
              />
            ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
