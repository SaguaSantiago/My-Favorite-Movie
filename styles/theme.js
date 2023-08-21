import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4891bd',
      main: '#3f5e70',
      dark: '#1D3557',
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
      paper: '#2e424ebf',
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif;",
  },
})
