import CustomAccordion from 'Components/CustomComponents/CustomAccordion'

import { useDispatch, useSelector } from 'react-redux'
import { toggleServiceToSearch } from 'redux/reducers/movies'

import { Chip } from '@mui/material'

export default function ServicesAccordion() {
  const { data, countryServices } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  return (
    <CustomAccordion
      selectedItems={
        data.servicesToSearch.length === 0
          ? 'Providers'
          : data.servicesToSearch.map(({ provider_id, provider_name, ...rest }) => (
              <Chip
                key={provider_id}
                label={provider_name}
                sx={{ color: '#cccccc' }}
                onClick={() =>
                  dispatch(toggleServiceToSearch({ provider_id, provider_name, ...rest }))
                }
                onDelete={() =>
                  dispatch(toggleServiceToSearch({ provider_id, provider_name, ...rest }))
                }
              />
            ))
      }
      items={countryServices.map(({ provider_id, provider_name, ...rest }) => (
        <Chip
          key={provider_id}
          label={provider_name}
          sx={{ color: '#cccccc' }}
          onClick={() => dispatch(toggleServiceToSearch({ provider_id, provider_name, ...rest }))}
        />
      ))}
    />
  )
}
