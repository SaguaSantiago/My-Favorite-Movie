import { forwardRef, useContext } from 'react'

import CustomTextField from 'Components/CustomComponents/CustomTextfield'
import { StyledCheckbox } from 'Components/ServiceSelector/ServicesCheckbox/StyledComponents'

import { useFilters } from 'hooks/useFilters'

import { Grid, Box, FormControlLabel, Button, Divider } from '@mui/material'
import GenresAccordion from 'Components/GenresAccordion'
import SelectLanguage from 'Components/SelectLanguage'
import SortBySelector from 'Components/SortBySelector'
import { useLanguage } from 'hooks/useLanguage'
import { FiltersContext } from 'Context/Filters'

const Form = forwardRef((props, ref) => {
  const { filters } = useContext(FiltersContext)
  const { type } = filters
  const { toggleType, changeSimpleFilter } = useFilters()
  const { languages, handleKeywordsChange, handleSubmit } = useLanguage()

  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      component='form'
      xs={12}
      item
    >
      <Box display='flex' justifyContent='center' gap={6}>
        <FormControlLabel
          label='Movies'
          checked={type === 'movie' ? true : false}
          onChange={() => toggleType('movie')}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
        <FormControlLabel
          label='Tv'
          checked={type === 'tv' ? true : false}
          onChange={() => toggleType('tv')}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
      </Box>
      <Box margin='0 auto' mt={3} mb={5} maxWidth='739px' width='100%'>
        <GenresAccordion />
      </Box>

      <Grid container gap={3} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Box
            width='100%'
            columnGap='10px'
            rowGap='5px'
            flexWrap='wrap'
            display='flex'
            justifyContent='center'
          >
            <SelectLanguage languages={languages} />
            <SortBySelector />
          </Box>
        </Grid>
        <Grid item xs={10} sm={5}>
          <CustomTextField
            onChange={(e) => changeSimpleFilter({ value: e.target.value, key: 'dateLimit' })}
            helperText='Movie/Serie release year limit. (Numbers)'
            fullWidth
            label='Year'
            placeholder='e.g 2022'
            type='number'
            defaultValue={2000}
            min={1900}
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <CustomTextField
            helperText='Movie/Episodes runtime limit. (Minutes)'
            placeholder='e.g 90'
            onChange={(e) => changeSimpleFilter({ value: e.target.value, key: 'runtime' })}
            fullWidth
            label='Runtime'
          />
        </Grid>
        <Grid item xs={10} sm={8} md={6}>
          <CustomTextField
            helperText='Each keyword separated with a comma.'
            placeholder='e.g "killer"'
            onChange={(e) => handleKeywordsChange(e)}
            fullWidth
            label='Keywords'
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, borderColor: '#ffffff31', width: '100%' }} />

      <Box ref={ref} width='60%' mx='auto'>
        <Button
          sx={(theme) => ({
            margin: '0 auto',
            mt: 2,
            borderColor: theme.palette.primary.light,
            color: theme.palette.primary.light,
          })}
          fullWidth
          variant='outlined'
          id='submit_button'
          onClick={handleSubmit}
          size='large'
        >
          Get Results
        </Button>
      </Box>
    </Grid>
  )
})
Form.displayName = 'Form'
export default Form
