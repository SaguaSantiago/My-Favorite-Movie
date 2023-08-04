import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import StarRoundedIcon from '@mui/icons-material/StarRounded'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  styled,
  Skeleton,
} from '@mui/material'
import { FiltersContext } from 'Context/Filters'

const StyledBox = styled(Box)`
  transition: color 0.3s;
  text-decoration: underline;
  :hover {
    color: #ffffffaa;
  }
`

export default function MovieCard({ media }) {
  const [genres, setGenres] = useState([])
  const { filters } = useContext(FiltersContext)
  const { availableGenres, type } = filters

  useEffect(() => {
    if (availableGenres) {
      media.genre_ids.map((gen) => {
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
          <Link href={`/details/${type}/${media.id}`}>
            <Box position='relative' width='100%' height='100%'>
              <Skeleton variant='rectangular' width='100%' height='100%' />
              <img
                layout='fill'
                objectFit='cover'
                src={
                  media.backdrop_path
                    ? `https://image.tmdb.org/t/p/w780/${media.backdrop_path}`
                    : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
                }
                alt={media.title || media.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              ></img>
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
                {media.vote_average}
              </Typography>
            </Box>
            <Link href={`/details/${type}/${media.id}`}>
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
                {media.title || media.name}
              </Typography>
            </Link>
          </Box>

          <Typography textAlign='center' pt={0.3} variant='body2' sx={{ color: '#c6ceed' }}>
            {media.release_date
              ? `(${media.release_date.slice(0, 4)})`
              : media.first_air_date && `(${media.first_air_date.slice(0, 4)})`}
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
            <Link href={`/details/${type}/${media.id}`}>See More</Link>
          </StyledBox>
        </CardContent>
      </Card>
    </Box>
  )
}
