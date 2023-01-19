import { useEffect } from 'react'

import GenresAccordion from 'Components/GenresAccordion'
import ServiceSelector from 'Components/ServiceSelector'
import Form from 'Components/Form'
import MovieCard from 'Components/MovieCard'

import { useDispatch, useSelector } from 'react-redux'

import { Grid, Container, Box, Pagination, PaginationItem } from '@mui/material'
import { changePageToSearch, getAllMovies } from 'redux/reducers/movies'

export default function MainRoute() {
  const { movies } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const { results, total_pages, page } = movies

  useEffect(() => {}, [])

  return (
    <>
      <Container component='main' maxWidth='md'>
        <Grid container justifyContent='center' gap={6} sx={{ pt: 2 }} alignItems='center'>
          <Grid component='section' item xs={12}>
            <ServiceSelector />
          </Grid>
          <Form />
        </Grid>
      </Container>
      {results.length !== 0 && (
        <>
          <Box
            padding='30px'
            width='100%'
            gap='20px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
          >
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
          <Box mt={3} mb={3} width='100%' display='flex' justifyContent='center'>
            <Pagination
              sx={{ color: 'white' }}
              size='large'
              page={page}
              count={total_pages}
              render={(item) => (
                <PaginationItem color='secondary' {...item} sx={{ color: 'white' }} />
              )}
              onChange={(e, value) =>{
                dispatch(changePageToSearch(value))
                dispatch(getAllMovies())
              }}
            />
          </Box>
        </>
      )}
    </>
  )
}
