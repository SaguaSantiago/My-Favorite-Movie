import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { MenuItem } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { getRegions } from 'api/getRegions'
import { useFilters } from 'hooks/useFilters'
import { FiltersContext } from 'Context/Filters'
import { logError } from 'Utilities/logError'

export default function SelectCountry({ absolute, closeDrawer, isDrawer }) {
  const { filters } = useContext(FiltersContext)
  const { changeSimpleFilter, getServices } = useFilters()
  const [regions, setRegions] = useState([])

  const handleChange = async (event) => {
    const newValue = event.target.value
    changeSimpleFilter({ value: newValue, key: 'country' })
    if (isDrawer) {
      closeDrawer()
    }
    try {
      await getServices(newValue)
    } catch (err) {
      logError('An Error has ocurred, please try another time')
    }
  }

  useEffect(() => {
    getRegions.then((res) => setRegions(res)).catch((err) => console.log(err))
  }, [])
  return (
    <CustomSelect
      onChange={handleChange}
      color='secondary'
      value={filters.country}
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
