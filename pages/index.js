import { useRef } from 'react'

import ServiceSelector from 'Components/ServiceSelector'
import Form from 'Components/Form'
import MovieCard from 'Components/MovieCard'

import { useDispatch, useSelector } from 'react-redux'
import { changePageToSearch, getAllMovies } from 'redux/reducers/movies'

import { toast } from 'react-toastify'

import { Grid, Container, Box, Pagination, PaginationItem } from '@mui/material'

export default function MainRoute() {
  const { movies, params } = useSelector((state) => state.movies)
  const submitBtnRef = useRef()
  const dispatch = useDispatch()
  const { results, total_pages, page } = movies

  return (
    <>
      <Container component='main' maxWidth='md'>
        <Grid container justifyContent='center' gap={6} sx={{ pt: 2 }} alignItems='center'>
          <Grid component='section' item xs={12}>
            <ServiceSelector />
          </Grid>
          <Form ref={submitBtnRef} />
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
              <MovieCard key={media.id} type={params.type} media={media} />
            ))}
          </Box>
          <Box mt={3} mb={3} width='100%' display='flex' justifyContent='center'>
            <Pagination
              sx={{ color: 'white' }}
              size='large'
              page={page}
              color='secondary'
              count={total_pages}
              render={(item) => (
                <PaginationItem {...item} sx={{ color: 'white', backgroundColor: 'red' }} />
              )}
              onChange={(e, value) => {
                dispatch(changePageToSearch(value))
                dispatch(getAllMovies())
                submitBtnRef.current.scrollIntoView({ behivor: 'smooth' })
                toast.info('loading...', {
                  position: 'bottom-right',
                  hideProgressBar: false,
                  pauseOnHover: false,
                  closeOnClick: false,
                  autoClose: 700,
                })
              }}
            />
          </Box>
        </>
      )}
    </>
  )
}
