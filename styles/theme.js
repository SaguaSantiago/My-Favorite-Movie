import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#9bb6c5',
      main: '#4a6d82',
      dark: '#1d272f',
    },
    secondary: {
      light: '#0066ff',
      // main: '#111F33',
      main: '#747474',
      contrastText: '#c1d5f9',
    },
    neutral: {
      main: '#ff4400',
      light: '#ffa726',
      dark: '#ef6c00',
      contrastText: '#c1d5f9',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: '#313d48',
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif;",
  },
})
