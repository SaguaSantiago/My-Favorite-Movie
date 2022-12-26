import React from 'react'

import { Navigation } from 'Components/Navigation'

import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { theme } from 'styles/theme'

import { store } from 'redux/store'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigation>
            <Component {...pageProps} />
          </Navigation>
        </Provider>
      </ThemeProvider>
    </>
  )
}
