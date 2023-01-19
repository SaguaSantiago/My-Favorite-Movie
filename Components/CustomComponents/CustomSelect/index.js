import { SelectInput } from './StyledComponents'

import { Select } from '@mui/material'

export default function CustomSelect({ bg, ...rest }) {
  return (
    <Select
      {...rest}
      color='secondary'
      input={rest.input || <SelectInput bg={bg} />}
      sx={{
        position: rest.absolute === 'true' ? 'absolute' : '',
        left: rest.absolute === 'true' ? '40px' : '',
      }}
      MenuProps={{
        sx: { maxHeight: '500px' },
        MenuListProps: {
          sx: {
            background: '#393939',
            color: '#fff',
          },
        },
      }}
      displayEmpty
    ></Select>
  )
}
