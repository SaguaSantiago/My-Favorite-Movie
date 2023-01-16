import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { useDispatch, useSelector } from 'react-redux'
import { getCountry, getServices } from 'redux/reducers/movies'

import { getServiceForCountry } from 'modules'
import { AMERICAN_COUNTRIES } from 'ListObject'

import { MenuItem } from '@mui/material'
import { response } from 'exampleResponse'
import { useEffect, useState } from 'react'
import { getRegions } from 'api/getRegions'
import { getServicesRequest } from 'api/getServices'

export default function SelectCountry({ absolute }) {
  const dispatch = useDispatch()
  const [regions, setRegions] = useState([])
  const { country } = useSelector((state) => state.movies)

  const handleChange = async (event) => {
    const newValue = event.target.value
    dispatch(getCountry(newValue))

    let services = await getServicesRequest(country)
    dispatch(getServices(services))
  }

  useEffect(() => {
    getRegions.then((res) => setRegions(res)).catch((err) => console.log(err))
  })
  return (
    <CustomSelect
      onChange={handleChange}
      color='secondary'
      value={country}
      displayEmpty
      absolute={absolute}
    >
      <MenuItem value=''>Select Your Country</MenuItem>
      {regions.map(({ iso_3166_1: key, native_name: name }) => (
        <MenuItem key={key} value={key}>
          {name}
        </MenuItem>
      ))}
    </CustomSelect>
  )
}
