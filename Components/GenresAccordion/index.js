import { useContext } from 'react'

import CustomAccordion from 'Components/CustomComponents/CustomAccordion'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import { Chip } from '@mui/material'
import { useFilters } from 'hooks/useFilters'
import { FiltersContext } from 'Context/Filters'

export default function GenresAccordion() {
  const { toggleGenreSelected } = useFilters()
  const { filters } = useContext(FiltersContext)
  const { genresSelected, availableGenres } = filters
  return (
    <CustomAccordion
      selectedItems={
        genresSelected.length === 0
          ? 'Genres'
          : genresSelected.map(({ id, name }) => {
              if (availableGenres.some((g) => g.id === id)) {
                return (
                  <Chip
                    key={id + Math.random() * 1000}
                    label={name}
                    variant='outlined'
                    color={'primary'}
                    sx={{ color: '#ffffff', borderColor: '#9bb6c5' }}
                    onClick={() => toggleGenreSelected({ id, name })}
                    onDelete={() => toggleGenreSelected({ id, name })}
                    deleteIcon={<RemoveCircleOutlineIcon sx={{ color: 'white' }} />}
                  />
                )
              }
            })
      }
      items={
        availableGenres &&
        availableGenres.map(({ id, name }) => (
          <Chip
            key={id + Math.random() * 1000}
            color='primary'
            sx={{ color: '#cfcfcf' }}
            onClick={() => toggleGenreSelected({ id, name })}
            label={name}
          />
        ))
      }
    ></CustomAccordion>
  )
}
