import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { MenuItem, useMediaQuery } from '@mui/material'
import { useFilters } from 'hooks/useFilters'

export default function SelectLanguage({ languages }) {
  const { changeSimpleFilter } = useFilters()
  const query = useMediaQuery('(max-width: 430px)')
  return (
    <CustomSelect
      onChange={(e) => changeSimpleFilter({ value: e.target.value, key: 'language' })}
      sx={{ margin: '0 auto' }}
      displayEmpty
      bg='#292929'
      inputWidth={query ? '127px' : ''}
      defaultValue=''
    >
      <MenuItem value=''>Language</MenuItem>
      {languages.map(({ iso_639_1: id, english_name: language }) => (
        <MenuItem key={id} value={id}>
          {language}
        </MenuItem>
      ))}
    </CustomSelect>
  )
}
