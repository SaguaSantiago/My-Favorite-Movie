import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { ITEMS_OBJECTS_MOVIES, ITEMS_OBJECTS_TV } from 'Utilities/objects'

import { MenuItem, useMediaQuery } from '@mui/material'
import { useFilters } from 'hooks/useFilters'
import { useContext } from 'react'
import { FiltersContext } from 'Context/Filters'

export default function SortBySelector() {
  const { filters } = useContext(FiltersContext)
  const { changeSimpleFilter } = useFilters()
  const query = useMediaQuery('(max-width: 430px)')
  const itemsToMap = filters.type === 'movie' ? ITEMS_OBJECTS_MOVIES : ITEMS_OBJECTS_TV

  return (
    <CustomSelect
      onChange={(e) => changeSimpleFilter({ value: e.target.value, key: 'sortBy' })}
      displayEmpty
      bg='#292929'
      defaultValue=''
      inputWidth={query ? '127px' : ''}
      value={filters.sortBy}
    >
      <MenuItem value=''>Sort By</MenuItem>
      {itemsToMap.map(({ itemName, value }) => (
        <MenuItem key={value} value={value}>
          {itemName}
        </MenuItem>
      ))}
    </CustomSelect>
  )
}
