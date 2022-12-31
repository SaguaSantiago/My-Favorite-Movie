import { useState } from 'react'

import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { useDispatch } from 'react-redux'
import { getCountry, getServices } from 'redux/reducers/movies'

import { getServiceForCountry } from 'modules'
import { AMERICAN_COUNTRIES } from 'CountryList'

import { MenuItem } from '@mui/material'

export default function SelectCountry({ absolute }) {
  const dispatch = useDispatch()
  const [country, setCountry] = useState('')
  const handleChange = async (event) => {
    const newValue = event.target.value
    dispatch(getCountry(newValue))

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
    <CustomSelect
      onChange={handleChange}
      color='secondary'
      value={country}
      defaultValue=''
      displayEmpty
      absolute={absolute}
    >
      <MenuItem value=''>Select Your Country</MenuItem>
      {AMERICAN_COUNTRIES.map(([key, value]) => (
        <MenuItem key={value} value={key}>
          {value}
        </MenuItem>
      ))}
    </CustomSelect>
  )
}
