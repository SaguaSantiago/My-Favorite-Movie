import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { Navigation, Scrollbar, Virtual } from 'swiper/modules'
import 'swiper/css/virtual'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import Link from 'next/link'

export default function BaseSwiper({ items, type }) {
  const threePerView = useMediaQuery('(min-width: 1250px)')
  const twoPerView = useMediaQuery('(min-width: 650px)')
  return (
    <Swiper
      modules={[Scrollbar, Virtual]}
      slidesPerView={threePerView ? 3 : twoPerView ? 2 : 1}
      scrollbar={{ draggable: true }}
      style={{ padding: '0 20px' }}
    >
      {items.map(({ title, poster_path, id, character, release_date, name }, i) => (
        <SwiperSlide
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          key={id}
        >
          <Box width='180px' height='300px' display='flex' flexDirection='column'>
            <Link href={`/details/${type}/${id}`}>
              <Box
                component='img'
                sx={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '200px',
                  borderRadius: '10px',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
              />
            </Link>
            <Typography
              fontFamily="'Ubuntu', sans-serif"
              textAlign='center'
              maxHeight='50px'
              overflow='hidden'
            >
              {title || name}
            </Typography>
            <Typography color='#e2d3fda3' mb={1} textAlign='center' variant='body2'>
              {character}
            </Typography>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
