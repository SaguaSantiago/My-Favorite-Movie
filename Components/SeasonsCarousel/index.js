// import Image from 'next/image'

// import Carousel from 'react-elastic-carousel'

// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   Skeleton,
//   useMediaQuery,
// } from '@mui/material'

// const BREAKPOINTS = [
//   { width: 1, itemsToShow: 1 },
//   { width: 500, itemsToShow: 2 },
//   { width: 800, itemsToShow: 3 },
//   { width: 1000, itemsToShow: 4 },
// ]

// export default function SeasonCarousel({ seasons }) {
//   const mobileQuery = useMediaQuery('(max-width: 550px)')
//   return (
//     <>
//   <Typography
//     sx={{ borderLeft: '6px solid #673ab7', mx: 4, pl: 1 }}
//     mt={12}
//     mb={4}
//     variant='h5'
//   >
//     Seasons
//   </Typography>
//       <Box sx={{ marginBottom: '100px' }} width={!mobileQuery ? '70%' : '100%'} margin='0 auto'>
//         <Carousel pagination={!mobileQuery} breakPoints={BREAKPOINTS}>
//           {seasons.map(({ poster_path, season_number, name, episode_count }) => (
//             <Box key={name} mb='40px' maxWidth='250px' height='450px'>
//               <Card sx={{ height: '100%' }}>
//                 <CardMedia sx={{ position: 'relative', height: '300px' }}>
//                   <Skeleton variant='rectangle' height='100%' width='100%' />
//                   <Image
//                     layout='fill'
//                     objectFit='cover'
//                     src={
//                       poster_path
//                         ? `https://image.tmdb.org/t/p/w300/${poster_path}`
//                         : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
//                     }
//                     alt={name}
//                   />
//                 </CardMedia>
//                 <CardContent sx={{ padding: '15px' }}>
//                   <Typography
//                     sx={{ color: 'white', display: 'inline-block', width: '100%' }}
//                     variant='overline'
//                   >
//                     season: {season_number}
//                   </Typography>
//                   <Typography
//                     sx={{ color: 'white', display: 'inline-block', width: '100%' }}
//                     variant='overline'
//                   >
//                     Name: {name}
//                   </Typography>
//                   <Typography
//                     sx={{ color: 'white', display: 'inline-block', width: '100%' }}
//                     variant='overline'
//                   >
//                     Episodes: {episode_count}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </Carousel>
//       </Box>
//     </>
//   )
// }
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material'

export default function SeasonsSwiper({ seasons }) {
  const oneSlide = useMediaQuery('(max-width: 800px)')
  const fourSlides = useMediaQuery('(max-width: 1070px)')
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
      <Swiper
        modules={[Navigation, Scrollbar]}
        scrollbar={{ draggable: true }}
        navigation
        slidesPerView={oneSlide ? 1 : fourSlides ? 3 : 4}
        style={{ padding: '20px 0' }}
      >
        {seasons.map(({ poster_path, name, season_number, episode_count }) => (
          <SwiperSlide key='name' style={{ display: 'flex', justifyContent: 'center' }}>
            <Box width='250px' height='450px'>
              <Card sx={{ height: '100%' }}>
                <CardMedia sx={{ position: 'relative', height: '300px' }}>
                  <Skeleton variant='rectangle' height='100%' width='100%' />
                  {poster_path ? (
                    <img
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        objectFit: 'cover',
                      }}
                      src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                      alt={name}
                    />
                  ) : (
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      position='absolute'
                      top='0'
                      width='100%'
                      height='100%'
                      bgcolor='black'
                    >
                      <Typography color='white' variant='h5'>
                        No Image
                      </Typography>
                    </Box>
                  )}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
