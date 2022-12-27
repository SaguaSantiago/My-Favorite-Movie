import { useState } from 'react'

import { MenuItem, Select } from '@mui/material'

import { SelectInput } from './CustomComponents'

import { AMERICAN_COUNTRIES } from 'CountryList'
import { useDispatch } from 'react-redux'
import { getServices } from 'redux/reducers/movies'
import { getServiceForCountry } from 'modules'

export default function SelectCountry() {
  const dispatch = useDispatch()
  const [country, setCountry] = useState('')
  const handleChange = async (event) => {
    const newValue = event.target.value
    let services = []

    if (newValue !== '') {
      const servicesList = await getServiceForCountry
      Object.entries(servicesList).forEach(([key, value]) => {
        if (value.some((v) => v === newValue.toLowerCase())) {
          services = [...services, key]
        }
      })
    }
    dispatch(getServices(services))
    setCountry(newValue)
  }

  return (
    <Select
      onChange={handleChange}
      sx={{ position: 'absolute', left: '40px' }}
      color='secondary'
      value={country}
      defaultValue=''
      displayEmpty
      input={<SelectInput />}
      MenuProps={{
        sx: { maxHeight: '500px' },
        MenuListProps: {
          sx: {
            background: '#393939',
            color: '#fff',
          },
        },
      }}
    >
      <MenuItem value=''>Select Country</MenuItem>
      {AMERICAN_COUNTRIES.map(([key, value]) => (
        <MenuItem key={value} value={key}>
          {value}
        </MenuItem>
      ))}
    </Select>
  )
}
