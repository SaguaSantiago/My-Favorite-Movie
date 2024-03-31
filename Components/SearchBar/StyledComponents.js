import { IconButton, FormControl, Input, Box } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { forwardRef } from 'react'

export const SearchInput = forwardRef(
  ({ open, mobileResolution, drawerResolution, handleClick, children, ...rest }, ref) => (
    <Box
      position='absolute'
      left='50%'
      bottom={open ? '-70px' : '0'}
      width={mobileResolution ? '300px' : drawerResolution ? '400px' : '600px'}
      style={{ opacity: open ? '1' : '0' }}
      sx={{
        transform: 'translateX(-50%)',
        transition: `bottom .6s ${open ? '0s' : '.6s'}, opacity .8s .3s`,
        zIndex: 10,
      }}
    >
      <FormControl sx={{ width: '100%' }} color='primary' variant='outlined'>
        <Input
          placeholder='Search'
          ref={ref}
          {...rest}
          sx={{
            background: '#314652',
            borderRadius: '3px',
            color: 'white',
            padding: 1,
            width: '100%',
            px: 2,
            height: '48px',
            '&:after': {
              borderColor: '#587d93',
            },
          }}
        />
        <CloseIcon
          sx={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        />
      </FormControl>
    </Box>
  ),
)
SearchInput.displayName = 'SearchInput'

export const SearchIconButton = ({ handleClick, open }) => (
  <IconButton
    onClick={handleClick}
    size='large'
    sx={(theme) => ({
      opacity: open ? '0' : '1',
      background: theme.palette.primary.dark,
      transition: 'background .2s',
      ':hover': {
        background: '#314652aa',
      },
    })}
  >
    <SearchIcon sx={{ color: 'white' }} />
  </IconButton>
)
