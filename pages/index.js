import { useContext, useRef } from 'react'

import ServiceSelector from 'Components/ServiceSelector'
import Form from 'Components/Form'
import MovieCard from 'Components/MovieCard'

import { Grid, Container, Box, Pagination, PaginationItem, Typography } from '@mui/material'
import { MoviesContext } from 'Context/Movies'
import { useFilters } from 'hooks/useFilters'
import { useMovies } from 'hooks/useMovies'
import InfoSvg from 'public/InfoSvg'

export default function MainRoute() {
  const { changeSimpleFilter } = useFilters()
  const { getAllMovies } = useMovies()
  const { state } = useContext(MoviesContext)
  const { movies } = state
  const { results, total_pages, actualPage } = movies
  const submitBtnRef = useRef()
  return (
    <>
      <Container sx={{ py: 4.5 }} component='main' maxWidth='md'>
        <Grid container justifyContent='center' gap={6} sx={{ pt: 2 }} alignItems='center'>
          <Grid component='section' item xs={12}>
            <ServiceSelector />
          </Grid>
          <Form ref={submitBtnRef} />

          {results.length === 0 && actualPage !== 0 ? (
            <Box
              border={(theme) => theme.palette.primary.light + ' 1px solid'}
              borderRadius='15px'
              width={'100%'}
              height='60px'
              bgcolor={'rgb(29 39 47 / 60%)'}
              display='flex'
              alignItems='center'
              gap={1}
              pl={2}
            >
              <Box p={1.3} bgcolor={(theme) => theme.palette.primary.dark} borderRadius='50%'>
                <InfoSvg />
              </Box>
              <span>No results found</span>
            </Box>
          ) : null}
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
            {results.map((media) => (
              <MovieCard key={media.id} media={media} />
            ))}
          </Box>
          <Box mt={3} mb={3} width='100%' display='flex' justifyContent='center'>
            <Pagination
              sx={{ color: 'white' }}
              size='large'
              page={actualPage}
              color='secondary'
              count={total_pages}
              render={(item) => (
                <PaginationItem {...item} sx={{ color: 'white', backgroundColor: 'red' }} />
              )}
              onChange={(e, value) => {
                changeSimpleFilter({ value, key: 'pageToSearch' })
                getAllMovies()
                submitBtnRef.current.scrollIntoView({ behivor: 'smooth' })
              }}
            />
          </Box>
        </>
      )}
    </>
  )
}
