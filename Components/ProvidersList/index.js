import { Grid, Box, Typography } from '@mui/material'

export default function ProvidersList({ providers }) {
  if (providers === undefined) {
    return (
      <Typography mt={3} sx={{ color: '#ffffff66' }} variant='h6' textAlign='center'>
        No provider available in your region
      </Typography>
    )
  }
  const flatrate = providers.flatrate
  const rent = providers.rent
  const buy = providers.buy
  const providersToMap = flatrate || rent || buy

  return (
    <Grid mt={9} container gap={2} justifyContent='center' alignItems='center'>
      {providersToMap.map(({ logo_path, provider_name }) => (
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
              <img
                layout='fill'
                objectFit='cover'
                style={{ width: '100%', height: '100%' }}
                src={`https://image.tmdb.org/t/p/original/${logo_path}`}
                alt={provider_name}
              />
            </Box>
            <Typography variant='overline' textAlign='center'>
              {provider_name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
