import { useEffect, useState, forwardRef } from 'react'

import CustomTextField from 'Components/CustomComponents/CustomTextfield'
import { StyledCheckbox } from 'Components/ServiceSelector/ServicesCheckbox/StyledComponents'

import { useSelector, useDispatch } from 'react-redux'
import { getAllMovies, setKeywords, toggleType } from 'redux/reducers/movies'
import { getKeywordsRequest } from 'api/getKeywords'

import { Grid, Box, FormControlLabel, Button, Divider, FormHelperText } from '@mui/material'
import { getLanguagesRequest } from 'api/getLanguages'
import GenresAccordion from 'Components/GenresAccordion'
import { toast } from 'react-toastify'
import SelectLanguage from 'Components/SelectLanguage'
import SortBySelector from 'Components/SortBySelector'

const Form = forwardRef((props, ref) => {
  const dispatch = useDispatch()

  const [languages, setLenguages] = useState([])
  const { type, servicesToSearch } = useSelector((state) => state.movies.params)

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
          label='Tv'
          checked={type === 'tv' ? true : false}
          onChange={() => dispatch(toggleType('tv'))}
          control={<StyledCheckbox size='medium' sx={{ color: '#8888ffdd' }} />}
        />
      </Box>
      <Box margin='0 auto' mt={3} mb={5} width='80%'>
        <GenresAccordion />
      </Box>

      <Grid container gap={3} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Box width='100%' columnGap='10px' rowGap='5px' flexWrap='wrap' display='flex' justifyContent='center'>
            <SelectLanguage languages={languages} />
            <SortBySelector />
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
          onClick={() => {
            if (servicesToSearch.length === 0) {
              toast.error('please select at least one service', {
                position: 'bottom-right',
                hideProgressBar: true,
                pauseOnHover: false,
                closeOnClick: true,
              })
            } else {
              dispatch(getAllMovies())
            }
          }}
          size='large'
        >
          Get Movies
        </Button>
      </Box>
    </Grid>
  )
})

export default Form
