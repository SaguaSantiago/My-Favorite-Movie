import { useRef, useState } from 'react'

import { search } from 'api/search'
import { useSelector } from 'react-redux'

import { SearchIconButton, SearchInput } from './StyledComponents'
import SearchedMedia from './SearchedMedia'

import { Box, Tooltip } from '@mui/material'

export default function searchBar({
  drawerResolution,
  mobileResolution,
  handleClickSearch,
  isSearching,
}) {
  const [open, setOpen] = useState(false)
  const [mediaData, setMediaData] = useState([])
  const { country } = useSelector((state) => state.movies.params)
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
        mt='128px'
        left='50%'
        position='absolute'
        display='flex'
        flexDirection='column'
        width={mobileResolution ? '300px' : drawerResolution ? '400px' : '600px'}
        sx={{ transform: 'translate(-50%)', zIndex: 10 }}
      >
        {isSearching && mediaData.length !== 0
          ? mediaData.map((media, i) => {
              if (i < 5) {
                return (
                  <SearchedMedia key={media.id} media={media} closeSearchBar={handleClickSearch} />
                )
              }
            })
          : null}
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
