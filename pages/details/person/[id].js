import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { logError } from 'Utilities/logError'
import { getPersonMovieCredits, getPersonTvCredits, getPersonDetails } from 'api/getPerson'
import { Box, Typography, useMediaQuery } from '@mui/material'

import CustomSwiper from 'Components/CustomComponents/Swiper'

export default function personDetail({ error, credits, details }) {
  const [seeMore, setSeeMore] = useState(false)
  const mobile = useMediaQuery('(max-width: 850px)')
  const router = useRouter()
  useEffect(() => {
    if (error) {
      logError(error)
      router.back()
    }
  }, [])
  // let credits = {
  //   movie: creditsjson.movie.sort((a, b) => b.popularity - a.popularity),
  //   tv: creditsjson.tv.sort((a, b) => b.popularity - a.popularity),
  // }
  console.log({ credits })
  return (
    <Box
      component='section'
      display='flex'
      justifyContent='center'
      alignItems={mobile ? 'center' : 'start'}
      flexDirection={mobile ? 'column' : 'row'}
      columnGap='30px'
      width='100%'
      minHeight='100vh'
      p={5}
      px={mobile ? 1 : 5}
      pt={7}
    >
      <Box width='80vw' alignItems='center' display='flex' flexDirection='column' mb={6}>
        <Box
          component='picture'
          minWidth='300px'
          maxWidth='300px'
          borderRadius='10px'
          overflow='hidden'
        >
          <img
            style={{
              width: '100%',
              objectFit: 'scale-down',
              borderRadius: '10px',
              maxWidth: '300px',
            }}
            src={`https://image.tmdb.org/t/p/h632/${details?.profile_path}`}
          />
        </Box>
        <Typography width='100%' variant='h4' fontWeight='bold' textAlign='center' mt={2}>
          {details?.name}
        </Typography>
        <Typography
          borderLeft='4px solid'
          borderColor='#8c65d1'
          fontWeight='bold'
          width={!mobile ? '300px' : '100%'}
          pl={0.5}
          mt={3}
          variant='h6'
        >
          Personal Info
        </Typography>
        <Box display='flex' width={!mobile ? '300px' : '100%'} flexDirection='column' mt={1}>
          <Typography width='100%' fontWeight='bold' variant='body1' mt={0.5}>
            Known For
          </Typography>
          <Typography width='100%' variant='body2'>
            {details?.known_for_department}
          </Typography>
        </Box>
        <Box display='flex' width={!mobile ? '300px' : '100%'} flexDirection='column' mt={1}>
          <Typography fontWeight='bold' variant='body1' mt={0.5}>
            Birth:
          </Typography>
          <Typography width='100%' variant='body2'>
            {details?.place_of_birth}
          </Typography>
          <Typography width='100%' variant='body2'>
            {details?.birthday}
          </Typography>
        </Box>
        <Box width={!mobile ? '300px' : '100%'} display='flex' flexDirection='column' mt={1}>
          <Typography width='100%' fontWeight='bold' variant='body1' mt={0.5}>
            Popularity
          </Typography>
          <Typography width='100%' variant='body2'>
            {details?.popularity}
          </Typography>
        </Box>
      </Box>

      <Box width={mobile ? '80vw' : '50vw'} pt={mobile ? 0 : 2}>
        <Typography sx={{ borderLeft: '6px solid #673ab7', pl: 1 }} mb={2} variant='h6'>
          Biography
        </Typography>
        <Typography
          maxWidth='700px'
          width='100%'
          height={seeMore ? 'min-content' : '100px'}
          overflow='hidden'
          variant='body2'
        >
          {details?.biography} {seeMore ? '' : '...'}
        </Typography>
        <Box
          component={Typography}
          display='inline-block'
          onClick={() => setSeeMore(!seeMore)}
          mt={2}
          color='violet'
          sx={{ ':hover': { cursor: 'pointer' } }}
        >
          {seeMore ? 'See Less' : 'See More'}
        </Box>
        <CustomSwiper title='tv' items={credits.tv}></CustomSwiper>
        <CustomSwiper title='movie' items={credits.movie}></CustomSwiper>
      </Box>
    </Box>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  try {
    const details = await getPersonDetails({ id })
    const movieCreditsData = await getPersonMovieCredits({ id })
    const tvCreditsData = await getPersonTvCredits({ id })

    let credits = {
      tv: tvCreditsData.sort((a, b) => {
        return new Date(b.first_air_date) - new Date(a.first_air_date)
      }),
      movie: movieCreditsData.sort((a, b) => b.vote_average - a.vote_average),
    }

    credits.tv = credits.tv.filter(
      (e, i, arr) =>
        i < 30 &&
        !e.character.includes('self') &&
        !e.character.includes('Self') &&
        e.character !== '' &&
        !arr.some((e_2, i_2) => e_2.name === e.name && i_2 !== i),
    )
    credits.movie = credits.movie.filter((e, i, arr) => i < 30 && e.character !== '')
    return {
      props: {
        details: details || null,
        credits: credits || null,
      },
    }
  } catch (error) {
    return {
      props: { error: 'An error has ocurred, please try again later' },
    }
  }
}
