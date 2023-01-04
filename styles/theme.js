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
      main: '#b1b1b1',
      contrastText: '#ffcc00',
    },
    neutral: {
      main: '#ff4400',
      light: '#ffa726',
      dark: '#ef6c00',
      contrastText: '#9c27b0',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif;",
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //         @font-face {
  //           font-family: 'Raleway';
  //           font-style: normal;
  //           font-display: swap;
  //           font-weight: 400;
  //           src: local('Raleway'), local('Raleway-Regular'), url({}) format('woff2');
  //         }
  //       `,
  //   },
  // },
})
