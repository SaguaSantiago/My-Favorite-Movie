import { useContext, useRef, useState } from 'react'

import { search } from 'api/search'

import { SearchIconButton, SearchInput } from './StyledComponents'
import SearchedMedia from './SearchedMedia'

import { Box, Tooltip } from '@mui/material'
import { FiltersContext } from 'Context/Filters'

export default function searchBar({
  drawerResolution,
  mobileResolution,
  handleClickSearch,
  isSearching,
}) {
  const [mediaData, setMediaData] = useState([])
  const { filters } = useContext(FiltersContext)
  const { country } = filters
  const inputRef = useRef(null)

  const handleChange = (e) => {
    search(e.target.value, country)
      .then((res) => setMediaData(res))
      .catch((err) => setMediaData([]))
  }
  return (
    <>
      <SearchInput
        open={isSearching}
        onChange={handleChange}
        handleClick={handleClickSearch}
        ref={inputRef}
        drawerResolution={drawerResolution}
        mobileResolution={mobileResolution}
      />
      <Box
        mt='134px'
        left='50%'
        position='absolute'
        display='flex'
        flexDirection='column'
        height={isSearching ? '500px' : '0px'}
        width={mobileResolution ? '300px' : drawerResolution ? '400px' : '600px'}
        overflow='hidden'
        sx={{
          transform: 'translate(-50%)',
          zIndex: 10,
          transition: 'height .35s',
          transitionDelay: isSearching ? '.6s' : '0s',
        }}
      >
        {mediaData.map((media, i) => {
          if (i < 5) {
            return <SearchedMedia key={media.id} media={media} closeSearchBar={handleClickSearch} />
          }
        })}
      </Box>
      <Tooltip title='If you want to search any specific' placement='top'>
        <Box position='absolute' bottom='-70px' left='50%' sx={{ transform: 'translateX(-50%)' }}>
          <SearchIconButton
            open={isSearching}
            handleClick={() => {
              handleClickSearch()
              setTimeout(() => inputRef.current.children[0].focus(), 400)
            }}
          />
        </Box>
      </Tooltip>
    </>
  )
}
