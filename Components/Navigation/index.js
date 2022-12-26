import { AppBar, Toolbar, Typography } from '@mui/material'

export function Navigation({ children }) {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            color='white'
            variant='h4'
            sx={{ margin: '20px auto', fontWeight: '600' }}
            textAlign='center'
          >
            My Favorite Movie
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}
