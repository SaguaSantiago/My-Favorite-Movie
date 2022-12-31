import { SelectInput } from './StyledComponents'

import { Select } from '@mui/material'

export default function CustomSelect(props) {
  return (
    <Select
      {...props}
      color='secondary'
      input={props.input || <SelectInput />}
      sx={{ position: props.absolute ? 'absolute' : '', left: props.absolute ? '40px' : '' }}
      MenuProps={{
        sx: { maxHeight: '500px' },
        MenuListProps: {
          sx: {
            background: '#393939',
            color: '#fff',
          },
        },
      }}
      // absolute={props.absolute}
      displayEmpty
    ></Select>
  )
}
