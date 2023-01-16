import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { useSelector, useDispatch } from 'react-redux'
import { toggleServiceToSearch } from 'redux/reducers/movies'

import { MenuItem } from '@mui/material'

export default function SelectService() {
  const { countryServices, data } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(toggleServiceToSearch(e.target.value))
  }
  return (
    countryServices.length !== 0 && (
      <CustomSelect onChange={handleChange} value={data.serviceToSearch}>
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
