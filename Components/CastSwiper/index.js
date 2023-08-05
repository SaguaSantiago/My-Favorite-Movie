import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import { Box, Typography, useMediaQuery } from '@mui/material'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

export default function CastSwiper({ cast }) {
  const threePerView = useMediaQuery('(max-width: 1000px)')
  const twoPerView = useMediaQuery('(max-width: 800px)')
  const onePerView = useMediaQuery('(max-width: 570px)')
  return (
    <>
      <Typography
        sx={{ borderLeft: '6px solid #673ab7', mx: 4, pl: 1 }}
        mt={12}
        mb={4}
        variant='h5'
      >
        Cast
      </Typography>
      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        slidesPerView={onePerView ? 1 : twoPerView ? 2 : threePerView ? 3 : 4}
        scrollbar={{ draggable: true }}
      >
        {cast.map(({ profile_path, name, character, credit_id }) => (
          <SwiperSlide
            key={credit_id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              width='250px'
              height='300px'
            >
              {profile_path ? (
                <img
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '50%',
                  }}
                  src={`https://image.tmdb.org/t/p/w154/${profile_path}`}
                  alt=''
                />
              ) : (
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  top='0'
                  width='200px'
                  height='200px'
                  bgcolor='black'
                  borderRadius='50%'
                >
                  <Typography color='white' textAlign='center' variant='h5'>
                    No Image
                  </Typography>
                </Box>
              )}
              <Typography fontWeight='Bold'>{name}</Typography>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '220px',
                }}
                variant='body2'
                textAlign={'center'}
                fontWeight='lighter'
              >
                {character}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
