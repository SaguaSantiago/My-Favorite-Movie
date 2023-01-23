import Image from 'next/image'

import RecommendationsCarousel from 'Components/RecommendationsCarousel'
import SeasonsCarousel from 'Components/SeasonsCarousel'
import FeatureCard from 'Components/FeatureCard'

import { useSelector } from 'react-redux'

import { getDetailsRequest } from 'api/getDetails'
import { useMediaQuery } from 'hooks/useMediaQuery'

import NumAbbr from 'number-abbreviate'

import { Container, Typography, Chip, Box, Grid } from '@mui/material'

export default function moviePage({ media, recommendations, providers, type }) {
  const mobileQuery = useMediaQuery('(max-width: 590px)')

  console.log(media)

  const { params } = useSelector((state) => state.movies)
  const { country } = params
  const providersToMap = providers[country]
  const numAbbr = new NumAbbr()

  const featureToMovie = Object.entries({
    runtime: `${media.runtime} min`,
    budget: numAbbr.abbreviate(media.budget, 1),
    revenue: numAbbr.abbreviate(media.revenue, 1),
    date: media.release_date,
    adult: media.adult ? 'Yes' : 'No',
    vote_average: media.vote_average.toFixed(1),
  })

  const featuresToTv = Object.entries({
    episode_run_time: `${media.episode_run_time} min`,
    first_air_date: media.first_air_date,
    adult: media.adult ? 'Yes' : 'No',
    vote_average: media.vote_average.toFixed(1),
    number_of_episodes: media.number_of_episodes,
    number_of_seasons: media.number_of_seasons,
  })

  const featuresToMap = type === 'movie' ? featureToMovie : featuresToTv

  return (
    <>
      <Container sx={{ padding: '0 !important' }} maxWidth='lg'>
        <Box width='100%' position='relative' mx='auto' maxHeight='600px' height='55vw'>
          <Image
            layout='fill'
            objectFit='cover'
            objectPosition='top'
            src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
          />
          <a
            href={
              type === 'movie'
                ? `https://www.imdb.com/title/${media.imdb_id}/`
                : `/${type}/${media.id}`
            }
          >
            <Box
              bottom={!mobileQuery ? '-80px' : '-150px'}
              left={!mobileQuery ? '20%' : '50%'}
              sx={{ transform: 'translateX(-50%)' }}
              width='200px'
              height='250px'
              position='absolute'
            >
              <Image
                layout='fill'
                objectFit='cover'
                src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
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
          {media.title || media.name}
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
          {media.genres.map(({ name, id }) => (
            <Chip
              key={id}
              label={name}
              size='large'
              sx={{ color: '#cccccc', backgroundColor: '#00000026' }}
            />
          ))}
        </Box>

        <Typography variant='h5' mt={5} textAlign='center'>
          {media.tagline && `"${media.tagline}"`}
        </Typography>
        <Box maxWidth='550px' margin='0 auto' mt={2} padding={1}>
          <Typography textAlign='center' paragraph>
            {media.overview}
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
          {featuresToMap.map(([key, value]) => (
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
          {media.production_companies.length !== 0 ? (
            media.production_companies.map(({ logo_path, name }) => (
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
                  <Image
                    layout='fill'
                    objectFit='scale-down'
                    src={
                      logo_path !== null
                        ? `https://image.tmdb.org/t/p/w92/${logo_path}`
                        : 'https://heuft.com/upload/image/400x267/no_image_placeholder.png'
                    }
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
              Companies not founded
            </Typography>
          )}
        </Grid>
        <Typography sx={{ borderTop: '1px solid white' }} pt={7} variant='h4' textAlign='center'>
          Where I watch it?
        </Typography>
        {country ? (
          <>
            <Grid mt={9} container gap={2} justifyContent='center' alignItems='center'>
              {providersToMap.flatrate.map(({ logo_path, provider_name }) => (
                <Grid item xs={12} sm={3} md={2} key={provider_name}>
                  <Box
                    width='100%'
                    display='flex'
                    justifyContent='center'
                    flexDirection='column'
                    flexWrap='wrap'
                    alignItems='center'
                  >
                    <Box width='100px' height='100px' position='relative'>
                      <Image
                        layout='fill'
                        objectFit='cover'
                        src={`https://image.tmdb.org/t/p/original/${logo_path}`}
                      />
                    </Box>
                    <Typography variant='overline' textAlign='center'>
                      {provider_name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
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
        <SeasonsCarousel seasons={media.seasons} />

        <RecommendationsCarousel type={type} recommendations={recommendations} />
      </Container>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { id, type } = params
  const props = await Promise.all(getDetailsRequest(id, type))
  return {
    props: {
      media: props[0],
      recommendations: props[1].results,
      providers: props[2].results,
      type,
    },
  }
}
