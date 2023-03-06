import Image from 'next/image'
import { StyledCheckbox, StyledIconButton } from './StyledComponents'

import { useDispatch, useSelector } from 'react-redux'
import { toggleServiceToSearch } from 'redux/reducers/movies'

import { Box } from '@mui/material'

export default function ServicesCheckbox({ service }) {
  const checked = useSelector((state) =>
    state.movies.params.servicesToSearch.some((srv) => srv.provider_id === service.provider_id),
  )
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(toggleServiceToSearch(service))
  }

  return (
    <Box display='flex' width='100%' justifyContent='center'>
      <StyledCheckbox
        onClick={handleChange}
        checked={checked}
        sx={{ color: '#8888ffdd', minHeight: '80px' }}
      />

      <StyledIconButton sx={{ mr: 4 }} onClick={handleChange}>
        <Image
          layout='fill'
          objectFit='cover'
          src={`https://image.tmdb.org/t/p/original/${service.logo_path}`}
          alt={service.name}
        />
      </StyledIconButton>
    </Box>
  )
}
