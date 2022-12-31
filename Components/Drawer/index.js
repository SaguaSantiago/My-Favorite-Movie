import { useEffect, useState } from 'react'

import { Container } from './StyledComponents'
import SelectCountry from 'Components/SelectCountry'
import SelectService from 'Components/SelectService'

import { OpenDrawerService } from 'services/Sharing-information'

import { SwipeableDrawer, IconButton, Typography, MenuItem, Divider } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'

export default function Drawer(mobileResolution) {
  const [open, setOpen] = useState(false)
  const openDrawerSuscription$ = OpenDrawerService.getSubject()

  useEffect(() => {
    openDrawerSuscription$.subscribe((data) => {
      console.log(data)
      if (!!data) {
        setOpen(true)
      }
    })
  }, [openDrawerSuscription$])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <SwipeableDrawer anchor='right' open={open} onClose={handleClose} onOpen={handleOpen}>
        <Container sx={{ pt: '40px' }}>
          <SelectCountry justify='center' />
          <Divider sx={{ width: '100%', borderColor: '#ffffff1f' }} variant='middle'></Divider>
          <SelectService closeDrawer={handleClose} />
        </Container>
      </SwipeableDrawer>
      <IconButton sx={{ width: '50px', height: '50px' }} onClick={handleOpen}>
        <PublicIcon
          sx={{
            width: !mobileResolution ? '40px' : '35px',
            height: !mobileResolution ? '40px' : '35px',
            color: 'white',
          }}
        />
      </IconButton>
    </>
  )
}
