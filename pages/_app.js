import React from 'react'

import { Navigation } from 'Components/Navigation'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@mui/material'
import { theme } from 'styles/theme'
import { ToastContainer } from 'react-toastify'

import { store } from 'redux/store'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigation>
            <Component {...pageProps} />
            <ToastContainer autoClose={700} />
          </Navigation>
        </Provider>
      </ThemeProvider>
    </>
  )
}
