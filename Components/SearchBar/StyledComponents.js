
import { IconButton, FormControl, Input } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

export const SearchInput = ({open, mobileResolution, drawerResolution, handleClick}) => (
  <FormControl
    sx={{
      position: 'absolute',
      left: '50%',
      bottom: open ? '-70px' : '0',
      transform: 'translateX(-50%)',
      transition: 'bottom .6s',
      zIndex: 10,
    }}
    color='primary'
    variant='outlined'
  >
    <Input
      placeholder='Search'
      sx={{
        background: '#314652',
        borderRadius: '3px',
        color: 'white',
        width: mobileResolution ? '250px' : drawerResolution ? '400px' : '600px',
        padding: 1,
        px: 2,
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
)

export const SearchIconButton = ({handleClick, open}) => (
    <IconButton
    onClick={handleClick}
    size='large'
    sx={{
      position: 'absolute',
      bottom: '-70px',
      left: '50%',
      opacity: open ? '0' : '1',
      transform: 'translateX(-50%)',
      background: '#314652',
      transition: 'background .2s',
      transition: 'right .6s',
      ':hover': {
        background: '#314652aa',
      },
    }}
  >
    <SearchIcon sx={{ color: 'white' }} />
  </IconButton>
)