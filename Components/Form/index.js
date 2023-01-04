import { useState } from 'react'
import { languagesObject } from 'ListObject'

import CustomSelect from 'Components/CustomComponents/CustomSelect'
import CustomTextField from 'Components/CustomComponents/CustomTextfield'
import { StyledCheckbox } from 'Components/ServiceSelector/ServicesCheckbox/StyledComponents'

import { useSelector, useDispatch } from 'react-redux'
import { getAllMovies } from 'redux/reducers/movies'

import { Grid, Box, FormControlLabel, MenuItem, Button, Divider } from '@mui/material'

export default function Form() {
  const dispatch = useDispatch()
  const [params, setParams] = useState({
    type: '',
    Language: '',
    keywords: '',
  })
  const { country, data } = useSelector((state) => state.movies)
  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      component='form'
      xs={12}
      item
    >
      <Box mb={5} display='flex' justifyContent='center' gap={6}>
        <FormControlLabel
          label='Movies'
          checked={params.type.movie}
          onChange={() => setParams({ ...params, type: 'movie' })}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
        <FormControlLabel
          label='Series'
          checked={params.type.serie}
          onChange={() => setParams({ ...params, type: 'series' })}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
      </Box>

      <Grid container gap={3} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Box width='100%' display='flex' justifyContent='center'>
            <CustomSelect
              onChange={(e) => setParams({ ...params, language: e.target.value })}
              sx={{ margin: '0 auto' }}
              displayEmpty
              bg='#292929'
              defaultValue=''
            >
              <MenuItem value=''>Language</MenuItem>
              {Object.entries(languagesObject).map(([language, id]) => (
                <MenuItem key={id} value={id}>
                  {language}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
          <CustomTextField
            onChange={(e) => setParams({ ...params, keywords: e.target.value })}
            fullWidth
            label='Keywords'
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, borderColor: '#ffffff31', width: '100%' }} />

      <Box width='100%' px={10} display='flex' justifyContent='center'>
        <Button
          sx={{ margin: '0 auto', mt: 2 }}
          fullWidth
          variant='contained'
          onClick={() =>
            dispatch(
              getAllMovies({
                ...params,
                country,
                ...data,
              }),
            )
          }
          size='large'
        >
          Get Movies
        </Button>
      </Box>
    </Grid>
  )
}
