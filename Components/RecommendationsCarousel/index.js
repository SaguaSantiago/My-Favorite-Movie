import { Box, Typography } from '@mui/material'
import { useMediaQuery } from 'hooks/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from 'react-elastic-carousel'

const BREAKPOINTS = [
  { width: 1, itemsToShow: 1 },
  { width: 700, itemsToShow: 2 },
  { width: 1000, itemsToShow: 3 },
]

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
        <Carousel pagination={!mobileQuery} breakPoints={BREAKPOINTS}>
          {recommendations.map(({ backdrop_path, id, title, name }) => (
            <Box key={id} width='300px'>
              <Link key={id} href={`/details/${type}/${id}`}>
                <Box
                  sx={{ ':hover': { cursor: 'pointer' } }}
                  width='100%'
                  borderRadius='10px'
                  overflow='hidden'
                  height='200px'
                  position='relative'
                  margin={1}
                >
                  <Image
                    layout='fill'
                    objectFit='cover'
                    src={
                      backdrop_path !== null
                        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                        : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
                    }
                  />
                </Box>
              </Link>
              <Typography
                sx={{ width: '100%', display: 'inline-block', textTransform: 'capitalize' }}
                textAlign='center'
                variant='overline'
              >
                {title || name}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  )
}
