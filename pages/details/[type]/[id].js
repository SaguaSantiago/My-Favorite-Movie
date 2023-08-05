import { useContext, useEffect } from 'react'
import { FiltersContext } from 'Context/Filters'
import { useRouter } from 'next/router'

import FeatureCard from 'Components/FeatureCard'

import { getDetailsRequest } from 'api/getDetails'

import NumAbbr from 'number-abbreviate'

import { Container, Typography, Chip, Box, Grid, Skeleton, useMediaQuery } from '@mui/material'
import ProvidersList from 'Components/ProvidersList'
import RecommendationsCarousel from 'Components/RecommendationsCarousel'
import SeasonsSwiper from 'Components/SeasonsCarousel'
import CastSwiper from 'Components/CastSwiper'
import { getCredits } from 'api/getCredits'
import { logError } from 'Utilities/logError'

export default function moviePage({
  media,
  recommendations,
  providers,
  type,
  features,
  cast,
  error,
}) {
  useEffect(() => {
    if (error) {
      logError(error)
      router.push('/')
    }
  }, [])
  const router = useRouter()
  const mobileQuery = useMediaQuery('(max-width: 590px)')
  const { filters } = useContext(FiltersContext)
  const { country } = filters
  const providersToMap = providers && providers[country]
  const featuresToMap = features

  return (
    <>
      <Container sx={{ padding: '0 !important' }} maxWidth='lg'>
        <Box width='100%' position='relative' mx='auto' maxHeight='600px' height='55vw'>
          <Skeleton variant='rectangular' width='100%' height='100%' />
          <img
            layout='fill'
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              objectFit: 'cover',
            }}
            src={`https://image.tmdb.org/t/p/w1280${media?.backdrop_path}`}
            alt={media?.title || media?.name}
          />
          <a
            href={
              type === 'movie'
                ? `https://www.imdb.com/title/${media?.imdb_id}/`
                : `/${type}/${media?.id}`
            }
            target='__blank'
          >
            <Box
              bottom={!mobileQuery ? '-80px' : '-150px'}
              left={!mobileQuery ? '20%' : '50%'}
              sx={{ transform: 'translateX(-50%)' }}
              width='200px'
              height='250px'
              position='absolute'
            >
              <Skeleton
                sx={{ bgcolor: 'gray.900' }}
                variant='rectangular'
                width='100%'
                height='100%'
              />
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  objectFit: 'cover',
                }}
                src={`https://image.tmdb.org/t/p/w342${media?.poster_path}`}
                title={media?.title || media?.name}
              />
            </Box>
          </a>
        </Box>
        <Typography
          variant='h2'
          textAlign='center'
          mt={!mobileQuery ? '100px' : '180px'}
          sx={{
            fontWeight: '400',
            fontSize: '40px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'underline',
          }}
        >
          {media?.title || media?.name}
        </Typography>
        <Box
          margin='0 auto'
          mt={2}
          gap='10px'
          width='310px'
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
          pb={2}
          sx={{ borderBottom: '1px solid #11111188' }}
        >
          {media?.genres.map(({ name, id }) => (
            <Chip
              key={id}
              label={name}
              size='large'
              sx={{ color: '#cccccc', backgroundColor: '#00000026' }}
            />
          ))}
        </Box>

        <Typography variant='h5' mt={5} textAlign='center'>
          {media?.tagline && `"${media?.tagline}"`}
        </Typography>
        <Box maxWidth='550px' margin='0 auto' mt={2} padding={1}>
          <Typography textAlign='center' paragraph>
            {media?.overview}
          </Typography>
        </Box>

        <Grid
          sx={{
            pt: 7,
            paddingBottom: 7,
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
          }}
          container
          rowGap={2}
          justifyContent='center'
          alignItems='center'
        >
          {featuresToMap?.map(([key, value]) => (
            <Grid xs={4.5} sm={2.4} md={1.5} item key={key}>
              <FeatureCard details={media} value={value} featureKey={key} />
            </Grid>
          ))}
        </Grid>

        <Typography
          mt={9}
          variant='h4'
          sx={{ letterSpacing: '2px', textDecoration: 'underline' }}
          textAlign='center'
        >
          Companies
        </Typography>
        <Grid mt={5} pb={9} container justifyContent='center' alignItems='center'>
          {media?.production_companies.length !== 0 ? (
            media?.production_companies.map(({ logo_path, name }) => (
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={name}
                item
                xs={5}
                sm={3.5}
                md={2}
              >
                <Box width='200px' height='100px' position='relative'>
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      objectFit: 'scale-down',
                    }}
                    src={
                      logo_path !== null
                        ? `https://image.tmdb.org/t/p/w92/${logo_path}`
                        : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
                    }
                    alt={name}
                  />
                </Box>
                <Typography variant='overline' textAlign='center'>
                  {name}
                </Typography>
              </Grid>
            ))
          ) : (
            <Typography
              sx={{ marginBottom: '100px', color: '#ffffff66' }}
              pt={7}
              variant='h6'
              textAlign='center'
            >
              Companies not found
            </Typography>
          )}
        </Grid>
        <Typography sx={{ borderTop: '1px solid white' }} pt={7} variant='h4' textAlign='center'>
          Where I watch it?
        </Typography>
        {country ? (
          <ProvidersList providers={providersToMap} />
        ) : (
          <Typography
            sx={{ marginBottom: '100px', color: '#ffffff66' }}
            pt={7}
            variant='h6'
            textAlign='center'
          >
            Please select a country to see the providers available in your region
          </Typography>
        )}
        {type === 'tv' ? <SeasonsSwiper seasons={media?.seasons} /> : null}
        <CastSwiper cast={cast || []} />
        <RecommendationsCarousel type={type} recommendations={recommendations || []} />
      </Container>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { id, type } = params

  try {
    const props = await Promise.all(getDetailsRequest(id, type))
    const cast = await getCredits({ type, id })
    const numAbbr = new NumAbbr()

    const featuresToTv = Object.entries({
      episode_run_time: `${props[0].episode_run_time} min`,
      first_air_date: props[0].first_air_date,
      adult: props[0].adult ? 'Yes' : 'No',
      vote_average: props[0].vote_average?.toFixed(1),
      number_of_episodes: props[0].number_of_episodes,
      number_of_seasons: props[0].number_of_seasons,
    })

    const featureToMovie = Object.entries({
      runtime: `${props[0].runtime} min`,
      budget: numAbbr.abbreviate(props[0].budget, 1),
      revenue: numAbbr.abbreviate(props[0].revenue, 1),
      release_date: props[0].release_date,
      adult: props[0].adult ? 'Yes' : 'No',
      vote_average: props[0].vote_average.toFixed(1),
    })

    return {
      props: {
        media: props[0],
        recommendations: props[1].results,
        providers: props[2].results,
        type,
        features: type === 'movie' ? featureToMovie : featuresToTv,
        cast,
      },
    }
  } catch (error) {
    return {
      props: {
        error,
      },
    }
  }
}
