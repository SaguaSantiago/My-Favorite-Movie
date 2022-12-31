import { useEffect } from 'react'

import GenresAccordion from 'Components/GenresAccordion'
import ServiceSelector from 'Components/ServiceSelector'

import { useDispatch, useSelector } from 'react-redux'

import { Grid, Container } from '@mui/material'

export default function MainRoute() {
  const dispatch = useDispatch()

  // const { loading, error, movies } = useSelector((state) => state.movies)

  useEffect(() => {}, [])

  return (
    <Container component='main' maxWidth='md'>
      <Grid container justifyContent='center' gap={6} sx={{ pt: 2 }} alignItems='center'>
        <Grid item xs={12}>
          <ServiceSelector />
        </Grid>
        <Grid item xs={12} sm={8} lg={9}>
          <GenresAccordion />
        </Grid>
      </Grid>
    </Container>
  )
}
