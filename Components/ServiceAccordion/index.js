import CustomAccordion from 'Components/CustomComponents/CustomAccordion'

import { Chip } from '@mui/material'
import { useFilters } from 'hooks/useFilters'
import { useContext } from 'react'
import { FiltersContext } from 'Context/Filters'

export default function ServicesAccordion() {
  const { filters } = useContext(FiltersContext)
  const { countryServices, servicesToSearch } = filters
  const { toggleServiceToSearch } = useFilters()
  return (
    <CustomAccordion
      selectedItems={
        servicesToSearch.length === 0
          ? 'Providers'
          : servicesToSearch.map(({ provider_id, provider_name, ...rest }) => (
              <Chip
                key={provider_id}
                label={provider_name}
                sx={{ color: '#cccccc' }}
                onClick={() => toggleServiceToSearch({ provider_id, provider_name, ...rest })}
                onDelete={() => toggleServiceToSearch({ provider_id, provider_name, ...rest })}
              />
            ))
      }
      items={countryServices.map(({ provider_id, provider_name, ...rest }) => (
        <Chip
          key={provider_id}
          label={provider_name}
          sx={{ color: '#cccccc' }}
          onClick={() => toggleServiceToSearch({ provider_id, provider_name, ...rest })}
        />
      ))}
    />
  )
}
