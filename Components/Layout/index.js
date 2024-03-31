import { useContext, useState } from 'react'
import Link from 'next/link'

import SelectCountry from 'Components/SelectCountry'
import SearchBar from 'Components/SearchBar'
import DrawerComponent from 'Components/Drawer'
import { BackgroundFade } from './StyledComponents'

import { AppBar, Box, Grid, Toolbar, Typography, styled, useMediaQuery } from '@mui/material'
import Footer from 'Components/Footer'

import styles from './layout.module.css'

import Logo from 'public/Logo'
import { useMovies } from 'hooks/useMovies'
import { MoviesContext } from 'Context/Movies'

const Offset = styled('div')(({ theme }) => {
  return { ...theme.mixins.toolbar, position: 'relative' }
})

export function Layout({ children }) {
  const [isSearching, setIsSearching] = useState(false)
  const { isChangingPage } = useMovies()
  const { state } = useContext(MoviesContext)
  const { loading } = state
  const drawerResolution = useMediaQuery('(max-width: 1000px)')
  const mobileResolution = useMediaQuery('(max-width: 570px)')

  const handleClickSearch = () => setIsSearching(!isSearching)

  return (
    <>
      <AppBar
        className={isChangingPage || loading === 'pending' ? styles.loading : ''}
        position='fixed'
        sx={{ background: 'var(--background-overshadowed)', backdropFilter: 'blur(10px)' }}
      >
        <Toolbar>
          <Grid
            container
            alignItems='center'
            justifyContent={!drawerResolution ? 'center' : 'space-between'}
            sx={{ padding: mobileResolution ? '' : '0 50px' }}
          >
            <Grid item>
              <Link href='/'>
                <Box
                  display='flex'
                  columnGap={2}
                  alignItems='center'
                  sx={{
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Logo />
                  <Typography
                    variant='h4'
                    sx={(theme) => ({
                      margin: '20px auto',
                      color: '#9AB9C6',
                      fontWeight: '600',
                      fontSize: mobileResolution ? '24px' : '34px',
                      fontFamily: `'Flamenco', cursive`,
                    })}
                    textAlign='center'
                  >
                    My Daily Movie
                  </Typography>
                </Box>
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

      <Footer />
    </>
  )
}
