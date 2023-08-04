import { StyledCheckbox, StyledIconButton } from './StyledComponents'

import { Box } from '@mui/material'
import { useFilters } from 'hooks/useFilters'
import { useContext } from 'react'
import { FiltersContext } from 'Context/Filters'

export default function ServicesCheckbox({ service }) {
  const { filters } = useContext(FiltersContext)
  const { servicesToSearch } = filters
  const { toggleServiceToSearch } = useFilters()

  const checked = servicesToSearch.some((srv) => srv.provider_id === service.provider_id)

  const handleChange = () => {
    toggleServiceToSearch(service)
  }

  return (
    <Box display='flex' width='100%' justifyContent='center'>
      <StyledCheckbox
        onClick={handleChange}
        checked={checked}
        sx={{ color: '#8888ffdd', minHeight: '80px' }}
      />

      <StyledIconButton sx={{ mr: 4 }} onClick={handleChange}>
        <img
          style={{ height: '100%', objectFit: 'cover' }}
          src={`https://image.tmdb.org/t/p/original/${service.logo_path}`}
          alt={service.name}
        />
      </StyledIconButton>
    </Box>
  )
}
