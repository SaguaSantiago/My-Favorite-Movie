import { SelectInput } from './StyledComponents'

import { Select } from '@mui/material'

export default function CustomSelect({ inputWidth = '', ...rest }) {
  return (
    <Select
      {...rest}
      color='primary'
      input={rest.input || <SelectInput width={inputWidth} />}
      sx={{
        position: rest.absolute === 'true' ? 'absolute' : '',
        left: rest.absolute === 'true' ? '40px' : '',
      }}
      MenuProps={(theme) => ({
        sx: { maxHeight: '500px' },
        MenuListProps: {
          sx: {
            background: theme.palette.primary.main,
          },
        },
      })}
      displayEmpty
    ></Select>
  )
}
