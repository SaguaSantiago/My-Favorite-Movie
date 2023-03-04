import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { ITEMS_OBJECTS_MOVIES, ITEMS_OBJECTS_TV } from 'Utilities/objects'

import { useDispatch, useSelector } from 'react-redux'
import { changeSortFilter } from 'redux/reducers/movies'

import { MenuItem, useMediaQuery } from '@mui/material'

export default function SortBySelector() {
  const { sortBy, type } = useSelector((state) => state.movies.params)
  const query = useMediaQuery('(max-width: 430px)')
  const dispatch = useDispatch()
  const itemsToMap = type === 'movie' ? ITEMS_OBJECTS_MOVIES : ITEMS_OBJECTS_TV

  return (
    <CustomSelect
      onChange={(e) => dispatch(changeSortFilter(e.target.value))}
      displayEmpty
      bg='#292929'
      defaultValue=''
      inputWidth={query ? '127px': ''}
      value={sortBy}
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
