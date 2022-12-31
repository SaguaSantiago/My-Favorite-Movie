import ServicesCheckbox from './ServicesCheckbox'

import { useMediaQuery } from 'hooks/useMediaQuery'
import { OpenDrawerService } from 'services/Sharing-information'

import { useSelector } from 'react-redux'

import { LogosObject } from '../../public/assets/Logos'

import { Grid, Button, Typography } from '@mui/material'

export default function ServiceSelector() {
  const { countryServices, country } = useSelector((state) => state.movies)
  const openDrawer = () => OpenDrawerService.setSubject(true)
  const media = useMediaQuery('(max-width: 490px)')

  return (
    <Grid justifyContent='center' gap={2} container sx={{ mt: '30px' }}>
      {country === '' ? (
        <Typography variant='h5'> First select a country!</Typography>
      ) : media ? (
        <>
          <Button onClick={openDrawer} variant='outlined' color='secondary'>
            Select Service
          </Button>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography
              textAlign='center'
              sx={{
                borderBottom: '1px solid white',
                pb: 1,
                width: '50%',
                margin: '0 auto 30px auto',
                fontWeight: '300',
              }}
              variant='h6'
            >
              Select a Service
            </Typography>
          </Grid>
          {countryServices.map((service) => {
            if (LogosObject.hasOwnProperty(service)) {
              return (
                <Grid item md={4} lg={2} key={service}>
                  <ServicesCheckbox service={service} Icon={LogosObject[service]} />
                </Grid>
              )
            }
          })}
        </>
      )}
    </Grid>
  )
}
