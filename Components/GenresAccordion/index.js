import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addGenre, deleteGenre } from 'redux/reducers/movies'

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

export default function GenresAccordion() {
  const [genres, setGenres] = useState({})
  const dispatch = useDispatch()
  const genresSelected = useSelector((state) => state.movies.data.genresSelected)
  useEffect(() => {
    getGenres.then((res) => {
      setGenres(res)
    })
  }, [])
  return (
    <Accordion>
      <AccordionSummary
        sx={{ background: '#525252', color: 'white' }}
        expandIcon={<ExpandMoreOutlined />}
      >
        <Typography textAlign='center'>
          {Object.keys(genresSelected).length === 0
            ? 'Genres'
            : Object.keys(genresSelected).map((genre) => (
                <Chip
                  key={genre}
                  size={'small'}
                  label={genre}
                  sx={{ color: '#cccccc' }}
                  onClick={() => dispatch(deleteGenre(genre))}
                  onDelete={() => dispatch(deleteGenre(genre))}
                />
              ))}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ background: '#525252', color: 'white', borderTop: '1px solid #bbbbbb' }}
      >
        <Grid container gap={1}>
          {Object.entries(genres).map(([genre, id]) => (
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
