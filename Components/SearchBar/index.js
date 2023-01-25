import { useState } from 'react'

import { SearchIconButton, SearchInput } from './StyledComponents'

export default function searchBar({ drawerResolution, mobileResolution }) {
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)

  return (
    <>
      <SearchInput
        open={open}
        handleClick={handleClick}
        drawerResolution={drawerResolution}
        mobileResolution={mobileResolution}
      />

      <SearchIconButton open={open} handleClick={handleClick} />
    </>
  )
}
// con: 20px in: 245px
