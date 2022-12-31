import { StyledCheckbox, StyledIconButton } from './StyledComponents'

import { getServiceToSearch } from 'redux/reducers/movies'
import { useDispatch, useSelector } from 'react-redux'

export default function ServicesCheckbox({ Icon, service }) {
  const checked = useSelector((state) => state.movies.data.serviceToSearch === service)
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(getServiceToSearch(service))
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <StyledCheckbox
        onClick={handleChange}
        checked={checked}
        sx={{ color: '#8888ffdd', minHeight: '80px' }}
      />

      <StyledIconButton sx={{ mr: 4 }} onClick={handleChange}>
        <Icon style={{ width: '80px' }} />
      </StyledIconButton>
    </div>
  )
}
