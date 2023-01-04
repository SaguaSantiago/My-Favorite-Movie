import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { useDispatch, useSelector } from 'react-redux'
import { getCountry, getServices } from 'redux/reducers/movies'

import { getServiceForCountry } from 'modules'
import { AMERICAN_COUNTRIES } from 'ListObject'

import { MenuItem } from '@mui/material'
import { response } from 'exampleResponse'

export default function SelectCountry({ absolute }) {
  const dispatch = useDispatch()
  const { country } = useSelector((state) => state.movies)

  const handleChange = async (event) => {
    const newValue = event.target.value
    dispatch(getCountry(newValue))

    let services = []

    if (newValue !== '') {
      const servicesList = await getServiceForCountry
      // const servicesList = await response
      Object.entries(servicesList).forEach(([key, value]) => {
        if (value.some((v) => v === newValue.toLowerCase())) {
          services = [...services, key]
        }
      })
    }
    dispatch(getServices(services))
  }
  return (
    <CustomSelect
      onChange={handleChange}
      color='secondary'
      value={country}
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
