import { useEffect, useState, forwardRef } from 'react'
import { languagesObject } from 'ListObject'

import CustomSelect from 'Components/CustomComponents/CustomSelect'
import CustomTextField from 'Components/CustomComponents/CustomTextfield'
import { StyledCheckbox } from 'Components/ServiceSelector/ServicesCheckbox/StyledComponents'

import { useSelector, useDispatch } from 'react-redux'
import { getAllMovies, setKeywords, setLanguage, toggleType } from 'redux/reducers/movies'
import { getKeywordsRequest } from 'api/getKeywords'

import {
  Grid,
  Box,
  FormControlLabel,
  MenuItem,
  Button,
  Divider,
  FormHelperText,
} from '@mui/material'
import { getLanguagesRequest } from 'api/getLanguages'
import GenresAccordion from 'Components/GenresAccordion'

const Form = forwardRef((props, ref) => {
  const dispatch = useDispatch()

  const [languages, setLenguages] = useState([])
  const { type } = useSelector((state) => state.movies.params)

  useEffect(() => {
    getLanguagesRequest.then((res) =>
      setLenguages(res.sort((a, b) => a.english_name.localeCompare(b.english_name))),
    )
  }, [])

  const handleKeywordsChange = (e) => {
    const inputValueArr = e.target.value.trim().split(' ')
    const valuesPromises = inputValueArr.map((keyword) => getKeywordsRequest(keyword))
    Promise.allSettled(valuesPromises).then((res) => {
      dispatch(
        setKeywords(
          res.map((keyword) => {
            if (keyword.status === 'fulfilled' && keyword.value !== undefined) {
              return keyword.value.id
            } else {
              return null
            }
          }),
        ),
      )
    })
  }

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
          onChange={() => dispatch(toggleType('movie'))}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
        <FormControlLabel
          label='Series'
          checked={type === 'serie' ? true : false}
          onChange={() => dispatch(toggleType('serie'))}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
      </Box>
      <Box margin='0 auto' mt={3} mb={5} width='80%'>
        <GenresAccordion />
      </Box>

      <Grid container gap={3} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Box width='100%' display='flex' justifyContent='center'>
            <CustomSelect
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              sx={{ margin: '0 auto' }}
              displayEmpty
              bg='#292929'
              defaultValue=''
            >
              <MenuItem value=''>Language</MenuItem>
              {languages.map(({ iso_639_1: id, english_name: language }) => (
                <MenuItem key={id} value={id}>
                  {language}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
          <CustomTextField onChange={(e) => handleKeywordsChange(e)} fullWidth label='Keywords' />
          <FormHelperText sx={{ color: '#aaa', pl: 2, pt: 0.3 }}>
            Each keyword separated with a comma
          </FormHelperText>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, borderColor: '#ffffff31', width: '100%' }} />

      <Box ref={ref} width='100%' px={10} display='flex' justifyContent='center'>
        <Button
          sx={{ margin: '0 auto', mt: 2 }}
          fullWidth
          variant='contained'
          id='submit_button'
          onClick={() => dispatch(getAllMovies())}
          size='large'
        >
          Get Movies
        </Button>
      </Box>
    </Grid>
  )
})

export default Form
