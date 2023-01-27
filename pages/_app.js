import React from 'react'

import { Layout } from 'Components/Layout'

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
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  )
}
