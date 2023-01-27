import { Box, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { useMediaQuery } from 'hooks/useMediaQuery'

export default function Footer() {
  const mobileResolution = useMediaQuery('(max-width: 670px)')
  const iconStyle = {
    width: '35px',
    height: '35px',
    transition: 'color .3s',
    ':hover': {
      color: '#ffffff88',
    },
  }
  return (
    <Box
      position='relative'
      gap='10px'
      bottom='0'
      mt='auto'
      width='100%'
      height='100px'
      sx={{ background: '#000000b8', zIndex: 1 }}
      component='footer'
    >
      <Box
        component='nav'
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100%'
        width='100%'
        gap='10px'
      >
        <a href='https://www.instagram.com/sant1.sagua' target='_blank'>
          <InstagramIcon sx={iconStyle} color='white' />
        </a>
        <a target='_blank' href='https://github.com/SaguaSantiago/My-Favorite-Movie'>
          <GitHubIcon sx={iconStyle} color='white' />
        </a>
        <a href='mailto:saguasantiago@gmail.com?subject=Vi%20My%2DFavorite%2DMovie%20y%20decidi%20contactarte'>
          <EmailIcon sx={iconStyle} color='white' />
        </a>
        <Box
          position='absolute'
          display='flex'
          gap='2px'
          left={!mobileResolution && '10px'}
          bottom={mobileResolution && 0}
        >
          <CopyrightIcon />
          <Typography
            variant='overline'
            sx={{ color: 'white', fontSize: mobileResolution ? '0.6rem' : '0.75rem' }}
          >
            Todos Los Derechos Reservados
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
