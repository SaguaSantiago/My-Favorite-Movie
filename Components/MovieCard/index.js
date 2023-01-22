import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useSelector } from 'react-redux'

import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, Card, CardContent, CardMedia, Typography, Chip, styled } from '@mui/material'

const StyledBox = styled(Box)`
  transition: color 0.3s;
  text-decoration: underline;
  :hover {
    color: #ffffffaa;
  }
`

export default function MovieCard({ movie }) {
  const [genres, setGenres] = useState([])
  const { availableGenres } = useSelector((state) => state.movies)

  useEffect(() => {
    if (availableGenres) {
      movie.genre_ids.map((gen) => {
        const genreObject = availableGenres.find((e) => e.id === gen)
        if (genreObject !== undefined && genres.length <= 3) {
          setGenres([...genres, genreObject])
        }
      })
    }
  }, [availableGenres])

  return (
    <Box component='article' minWidth='300px' width='480px' height='480px'>
      <Card sx={{ height: '100%' }}>
        <CardMedia sx={{ height: '60%', ':hover': { cursor: 'pointer' } }}>
          <Link href={`/movie/${movie.id}`}>
            <Box position='relative' width='100%' height='100%'>
              <Image
                layout='fill'
                objectFit='cover'
                src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
              ></Image>
            </Box>
          </Link>
        </CardMedia>

        <CardContent
          sx={{
            height: '40%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '0',
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid white',
            }}
            display='flex'
            justifyContent='center'
            width='100%'
          >
            <Box display='flex' position='absolute' left='16px'>
              <StarRoundedIcon sx={{ color: '#ffff00d6', height: '30px', width: '30px' }} />
              <Typography sx={{ width: 'text-content', color: '#ffff00d6', fontSize: '1.2rem' }}>
                {movie.vote_average}
              </Typography>
            </Box>
            <Link href={`/movie/${movie.id}`}>
              <Typography
                sx={{
                  fontWeight: '400',
                  pb: 1,
                  ':hover': { cursor: 'pointer', color: '#ffffffaa' },
                  width: 'max-content',
                  maxWidth: '285px',
                  mt: 3,
                }}
                textAlign='center'
                color='white'
                variant='h5'
              >
                {movie.title}
              </Typography>
            </Link>
          </Box>

          <Typography textAlign='center' pt={0.3} variant='body2' sx={{ color: '#c6ceed' }}>
            ({movie.release_date.slice(0, 4)})
          </Typography>
          <Box position='absolute' left='15px' bottom='15px'>
            {genres.map(({ name, id }) => (
              <Chip
                label={name}
                key={id}
                size='small'
                sx={{
                  width: 'max-content',
                  color: '#ccc',
                  letterSpacing: '.8px',
                  p: 0.1,
                  background: '#212121',
                  marginTop: 'auto',
                }}
              />
            ))}
          </Box>
          <StyledBox
            position='absolute'
            right='15px'
            bottom='15px'
            color='white'
            width='max-content'
          >
            <Link href={`/movie/${movie.id}`}>See More</Link>
          </StyledBox>
        </CardContent>
      </Card>
    </Box>
  )
}
