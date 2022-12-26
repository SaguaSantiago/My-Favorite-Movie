import { getAllMovies } from './../redux/reducers/movies'
import { getGenres } from 'modules'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function MainRoute() {
  const dispatch = useDispatch()

  const { loading, error, movies } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(getAllMovies())
    getGenres.then((genres) => console.log(genres))
  }, [])

  return <h1>a</h1>
}
