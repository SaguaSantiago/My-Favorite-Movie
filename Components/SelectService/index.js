import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { MenuItem } from '@mui/material'
import { useFilters } from 'hooks/useFilters'
import { useContext } from 'react'
import { FiltersContext } from 'Context/Filters'

export default function SelectService() {
  const { toggleServiceToSearch } = useFilters()
  const { filters } = useContext(FiltersContext)
  const { countryServices, serviceToSearch } = filters
  const handleChange = (e) => {
    toggleServiceToSearch(e.target.value)
  }
  return (
    countryServices.length !== 0 && (
      <CustomSelect onChange={handleChange} value={serviceToSearch}>
        <MenuItem value=''>Select Service</MenuItem>
        {countryServices.map((service) => {
          return (
            <MenuItem key={service.provider_id} value={service}>
              {service.provider_name}
            </MenuItem>
          )
        })}
      </CustomSelect>
    )
  )
}
