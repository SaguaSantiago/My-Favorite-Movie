import { useEffect } from 'react'

import GenresAccordion from 'Components/GenresAccordion'
import ServiceSelector from 'Components/ServiceSelector'

import { useDispatch, useSelector } from 'react-redux'

import { Grid, Container } from '@mui/material'
import Form from 'Components/Form'

export default function MainRoute() {
  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state.movies)

  useEffect(() => {
  }, [])

  return (
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
      {/* {movies.length !== 0 && (
        <Box position='relative' width='200px' height='400px'>
          <Image fill src={ImageUrl('400', '5TNSfR1OdcNHMnJV7QczdqdfaGR.jpg')}></Image>
        </Box>
      )} */}
    </Container>
  )
}
