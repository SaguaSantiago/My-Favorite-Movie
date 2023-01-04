import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { useSelector, useDispatch } from 'react-redux'
import { getServiceToSearch } from 'redux/reducers/movies'

import { MenuItem } from '@mui/material'

export default function SelectService({ closeDrawer }) {
  const { countryServices, data } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(getServiceToSearch(e.target.value))
    closeDrawer()
  }
  return (
    countryServices.length !== 0 && (
      <CustomSelect onChange={handleChange} value={data.serviceToSearch}>
        <MenuItem value=''>Select Service</MenuItem>
        {countryServices.map((service) => {
          const value = service.charAt(0).toUpperCase() + service.slice(1)
          return (
            <MenuItem key={service} value={service}>
              {value}
            </MenuItem>
          )
        })}
      </CustomSelect>
    )
  )
}
