import { useSelector, useDispatch } from 'react-redux'

import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { getServiceToSearch } from 'redux/reducers/movies'

import { MenuItem } from '@mui/material'

export default function SelectService({ closeDrawer }) {
  const services = useSelector((state) => state.movies.countryServices)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(getServiceToSearch(e.target.value))
    closeDrawer()
  }
  return (
    services.length !== 0 && (
      <CustomSelect onChange={handleChange} defaultValue=''>
        <MenuItem value=''>Select Service</MenuItem>
        {services.map((service) => {
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
