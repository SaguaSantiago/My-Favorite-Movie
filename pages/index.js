import { useEffect } from 'react'

import GenresAccordion from 'Components/GenresAccordion'
import ServiceSelector from 'Components/ServiceSelector'
import Form from 'Components/Form'
import MovieCard from 'Components/MovieCard'

import { useDispatch, useSelector } from 'react-redux'

import { Grid, Container, Box } from '@mui/material'

export default function MainRoute() {
  const { movies } = useSelector((state) => state.movies)

  useEffect(() => {}, [])

  return (
    <>
      <Container component='main' maxWidth='md'>
        <Grid container justifyContent='center' gap={6} sx={{ pt: 2 }} alignItems='center'>
          <Grid component='section' item xs={12}>
            <ServiceSelector />
          </Grid>
          <Grid component='section' item xs={12} sm={8} lg={9}>
            <GenresAccordion />
          </Grid>
          <Form />
        </Grid>
      </Container>

      <Box
        padding='30px'
        width='100%'
        gap='20px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
      >
        {movies.length !== 0 && movies.map((movie) => <MovieCard movie={movie} />)}
      </Box>
    </>
  )
}
