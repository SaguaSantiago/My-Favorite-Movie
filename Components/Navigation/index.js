import { useState } from 'react'
import Link from 'next/link'

import SelectCountry from 'Components/SelectCountry'
import SearchBar from 'Components/SearchBar'
import DrawerComponent from 'Components/Drawer'
import { BackgroundFade } from './StyledComponents'

import { useMediaQuery } from 'hooks/useMediaQuery'

import { AppBar, Grid, Toolbar, Typography, styled } from '@mui/material'

const Offset = styled('div')(({ theme }) => {
  return { ...theme.mixins.toolbar, position: 'relative' }
})


export function Navigation({ children }) {
  const [isSearching, setIsSearching] = useState(false)
  const drawerResolution = useMediaQuery('(max-width: 1000px)')
  const mobileResolution = useMediaQuery('(max-width: 570px)')

  const handleClickSearch = () => setIsSearching(!isSearching)

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Grid
            container
            alignItems='center'
            justifyContent={!drawerResolution ? 'center' : 'space-between'}
            sx={{ padding: mobileResolution ? '' : '0 50px' }}
          >
            <Grid item>
              <Link href='/'>
                <Typography
                  color='white'
                  variant='h4'
                  sx={{
                    margin: '20px auto',
                    fontWeight: '600',
                    fontSize: mobileResolution ? '24px' : '34px',
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                  textAlign='center'
                >
                  My Favorite Movie
                </Typography>
              </Link>
            </Grid>
            {!drawerResolution ? (
              <SelectCountry absolute={'true'} />
            ) : (
              <Grid item>
                <DrawerComponent></DrawerComponent>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Offset>
        <SearchBar
          handleClickSearch={handleClickSearch}
          drawerResolution={drawerResolution}
          mobileResolution={mobileResolution}
          isSearching={isSearching}
        />
      </Offset>
      {isSearching ? <BackgroundFade /> : null}
      {children}
    </>
  )
}
