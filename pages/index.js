import { useEffect } from 'react'

import ServiceSelector from 'Components/ServiceSelector'

import { useDispatch, useSelector } from 'react-redux'

import { getMoviesRequest } from 'modules'

import { Container } from '@mui/material'

export default function MainRoute() {
  const dispatch = useDispatch()

  // const { loading, error, movies } = useSelector((state) => state.movies)

  useEffect(() => {}, [])

  return <Container maxWidth='md'></Container>
}
