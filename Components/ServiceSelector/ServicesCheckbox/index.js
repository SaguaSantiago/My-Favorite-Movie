import { StyledCheckbox, StyledIconButton } from './StyledComponents'

import { useDispatch, useSelector } from 'react-redux'
import { getServiceToSearch } from 'redux/reducers/movies'

import { Box } from '@mui/material'

export default function ServicesCheckbox({ Icon, service }) {
  const checked = useSelector((state) => state.movies.data.serviceToSearch === service)
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(getServiceToSearch(service))
  }

  return (
    <Box display='flex' width='100%' justifyContent='center'>
      <StyledCheckbox
        onClick={handleChange}
        checked={checked}
        sx={{ color: '#8888ffdd', minHeight: '80px' }}
      />

      <StyledIconButton sx={{ mr: 4 }} onClick={handleChange}>
        <Icon style={{ width: '80px' }} />
      </StyledIconButton>
    </Box>
  )
}
