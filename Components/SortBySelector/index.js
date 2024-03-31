import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { ITEMS_OBJECTS_MOVIES, ITEMS_OBJECTS_TV } from 'Utilities/objects'

import { MenuItem, Typography, useMediaQuery } from '@mui/material'
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
      defaultValue=''
      inputWidth={query ? '127px' : ''}
      value={filters.sortBy}
    >
      <MenuItem value=''>
        <Typography color='white'>Sort By</Typography>
      </MenuItem>
      {itemsToMap.map(({ itemName, value }) => (
        <MenuItem key={value} value={value}>
          <Typography color='white'>{itemName}</Typography>
        </MenuItem>
      ))}
    </CustomSelect>
  )
}
