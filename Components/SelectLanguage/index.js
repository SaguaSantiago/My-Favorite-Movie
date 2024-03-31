import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { MenuItem, Typography, useMediaQuery } from '@mui/material'
import { useFilters } from 'hooks/useFilters'

export default function SelectLanguage({ languages }) {
  const { changeSimpleFilter } = useFilters()
  const query = useMediaQuery('(max-width: 430px)')
  return (
    <CustomSelect
      onChange={(e) => changeSimpleFilter({ value: e.target.value, key: 'language' })}
      sx={{ margin: '0 auto' }}
      displayEmpty
      inputWidth={query ? '127px' : ''}
      defaultValue=''
    >
      <MenuItem value=''>
        <Typography color='white'>Language</Typography>
      </MenuItem>
      {languages.map(({ iso_639_1: id, english_name: language }) => (
        <MenuItem key={id} value={id}>
          <Typography color='white'> {language}</Typography>
        </MenuItem>
      ))}
    </CustomSelect>
  )
}
