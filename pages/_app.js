import React from 'react'

import { Layout } from 'Components/Layout'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@mui/material'
import { theme } from 'styles/theme'
import { ToastContainer } from 'react-toastify'

import MoviesProvider from 'Context/Movies'
import FiltersProvider from 'Context/Filters'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FiltersProvider>
          <MoviesProvider>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </MoviesProvider>
        </FiltersProvider>
      </ThemeProvider>
    </>
  )
}
