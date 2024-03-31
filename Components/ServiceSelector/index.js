import ServicesAccordion from 'Components/ServiceAccordion'
import ServicesCheckbox from './ServicesCheckbox'

import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useContext } from 'react'
import { FiltersContext } from 'Context/Filters'

export default function ServiceSelector() {
  const { filters } = useContext(FiltersContext)
  const { countryServices, country } = filters
  const media = useMediaQuery('(max-width: 490px)')

  return (
    <Grid justifyContent='center' gap={2} container sx={{ mt: '30px' }}>
      {country === '' ? (
        <Typography variant='h5' fontWeight='normal' color=''>
          {' '}
          First select a country!
        </Typography>
      ) : media ? (
        <ServicesAccordion />
      ) : (
        <>
          <Grid item xs={12}>
            <Typography
              textAlign='center'
              sx={{
                borderBottom: '1px solid #777',
                pb: 1,
                width: '100%',
                maxWidth: '740px',
                margin: '0 auto 30px auto',
                fontWeight: 'normal',
              }}
              variant='h6'
            >
              Select a Service
            </Typography>
          </Grid>
          {countryServices.map((service) => {
            return (
              <Grid item md={2} lg={2} key={service.provider_id}>
                <ServicesCheckbox service={service} />
              </Grid>
            )
          })}
        </>
      )}
    </Grid>
  )
}
