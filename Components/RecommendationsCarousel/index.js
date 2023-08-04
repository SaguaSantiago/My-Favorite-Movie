import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { Carousel } from 'react-responsive-carousel'

export default function RecommendationsCarousel({ recommendations, type }) {
  const mobileQuery = useMediaQuery('(max-width: 550px)')
  return (
    <>
      <Typography
        sx={{ borderLeft: '6px solid #673ab7', mx: 4, pl: 1 }}
        mt={12}
        mb={4}
        variant='h5'
      >
        Recommendations
      </Typography>
      <Box sx={{ marginBottom: '100px' }} width={!mobileQuery ? '70%' : '100%'} margin='0 auto'>
        <Carousel showThumbs={false} swipeable infiniteLoop interval={2000}>
          {recommendations.map(({ backdrop_path, id, title, name }) => (
            <Box key={id} width='100%'>
              <Link href={`/details/${type}/${id}`}>
                <Box sx={{ ':hover': { cursor: 'pointer' } }} height='400px' position='relative'>
                  <Skeleton variant='rectangular' width='100%' height='100%' />
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      objectFit: 'cover',
                    }}
                    src={
                      backdrop_path !== null
                        ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
                        : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
                    }
                    alt={title || name}
                  />
                </Box>
              </Link>
              <Box
                width='100%'
                position='absolute'
                bottom='30px'
                left='50%'
                sx={{ transform: 'translateX(-50%)' }}
              >
                <Typography
                  sx={{
                    display: 'inline-block',
                    textTransform: 'capitalize',
                    zIndex: 1,
                    background: '#0000009a',
                    width: '100%',
                  }}
                  textAlign='center'
                  variant='overline'
                >
                  {title || name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  )
}
