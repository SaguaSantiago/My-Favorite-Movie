import { getServiceToSearch } from 'redux/reducers/movies'
import { useDispatch, useSelector } from 'react-redux'

import { Checkbox, IconButton, styled } from '@mui/material'

const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
      max-height: 80px;
      background: #ffffff;
      padding: 0 20px;
      overflow: hidden;
      transition: background 0.3s;
      :hover {
          background: #818181;
      }
      &.MuiButtonBase-root {
        min-height: 80px;
      }
  `,
)

const StyledCheckbox = styled(Checkbox)(
  ({ theme }) => `
    &.Mui-checked {
      color:#8888ffdd;
    }
    `,
)

export default function ServicesCheckbox({ Icon, service }) {
  const checked = useSelector((state) => state.movies.serviceToSearch === service)
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
