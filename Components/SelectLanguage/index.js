import CustomSelect from 'Components/CustomComponents/CustomSelect'

import { setLanguage } from 'redux/reducers/movies'

import { MenuItem, useMediaQuery } from '@mui/material'

export default function SelectLanguage({ languages }) {
  const query = useMediaQuery('(max-width: 430px)')
  return (
    <CustomSelect
      onChange={(e) => dispatch(setLanguage(e.target.value))}
      sx={{ margin: '0 auto', }}
      displayEmpty
      bg='#292929'
      inputWidth={query ? '127px': ''}
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
