import Image from 'next/image'
import { useMediaQuery } from 'hooks/useMediaQuery'

import Carousel from 'react-elastic-carousel'

import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

const BREAKPOINTS = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2 },
  { width: 800, itemsToShow: 3 },
  { width: 1000, itemsToShow: 4 },
]

export default function SeasonCarousel({ seasons }) {
  const mobileQuery = useMediaQuery('(max-width: 550px)')
  return (
    <>
      <Typography
        sx={{ borderLeft: '6px solid #673ab7', mx: 4, pl: 1 }}
        mt={12}
        mb={4}
        variant='h5'
      >
        Seasons
      </Typography>
      <Box sx={{ marginBottom: '100px' }} width={!mobileQuery ? '70%' : '100%'} margin='0 auto'>
        <Carousel pagination={!mobileQuery} breakPoints={BREAKPOINTS}>
          {seasons.map(({ poster_path, season_number, name, episode_count }) => (
            <Box mb='40px' maxWidth='250px' height='450px'>
              <Card sx={{ height: '100%' }}>
                <CardMedia sx={{ position: 'relative', height: '300px' }}>
                  <Image
                    layout='fill'
                    objectFit='cover'
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/original/${poster_path}`
                        : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
                    }
                  />
                </CardMedia>
                <CardContent sx={{ padding: '15px' }}>
                  <Typography
                    sx={{ color: 'white', display: 'inline-block', width: '100%' }}
                    variant='overline'
                  >
                    season: {season_number}
                  </Typography>
                  <Typography
                    sx={{ color: 'white', display: 'inline-block', width: '100%' }}
                    variant='overline'
                  >
                    Name: {name}
                  </Typography>
                  <Typography
                    sx={{ color: 'white', display: 'inline-block', width: '100%' }}
                    variant='overline'
                  >
                    Episodes: {episode_count}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  )
}
