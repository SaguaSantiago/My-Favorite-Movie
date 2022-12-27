import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import SelectCountry from 'Components/SelectCountry'
import DrawerComponent from 'Components/Drawer'
import { useMediaQuery } from 'hooks/useMediaQuery'

export function Navigation({ children }) {
  const drawerResolution = useMediaQuery('(max-width: 1000px)')
  const mobileResolution = useMediaQuery('(max-width: 570px)')

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Grid
            container
            alignItems='center'
            justifyContent={!drawerResolution ? 'center' : 'space-between'}
            sx={{ padding: mobileResolution ? '' : '0 50px' }}
          >
            <Grid Item>
              <Typography
                color='white'
                variant='h4'
                sx={{
                  margin: '20px auto',
                  fontWeight: '600',
                  fontSize: mobileResolution ? '24px' : '34px',
                }}
                textAlign='center'
              >
                My Favorite Movie
              </Typography>
            </Grid>
            {!drawerResolution ? (
              <SelectCountry />
            ) : (
              <Grid item>
                <DrawerComponent></DrawerComponent>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}
