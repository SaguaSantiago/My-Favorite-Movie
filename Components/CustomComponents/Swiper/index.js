import { Box, Typography, useMediaQuery } from '@mui/material'
import BaseSwiper from './BaseSwiper'

export default function CustomSwiper({ items, title: type }) {
  return (
    <>
      <Typography sx={{ borderLeft: '6px solid #673ab7', pl: 1 }} mt={6} mb={4} variant='h6'>
        Latest Participations {type === 'movie' ? '(movie)' : '(tv)'}
      </Typography>
      <Box width={'100%'}>
        <BaseSwiper type={type} items={items} />
      </Box>{' '}
    </>
  )
}
