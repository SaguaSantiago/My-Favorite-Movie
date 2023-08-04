import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function SearchedMedia({ media, closeSearchBar }) {
  return (
    <Link href={`/details/${media.media_type}/${media.id}`}>
      <Box
        position='relative'
        overflow='hidden'
        width='100%'
        display='flex'
        alignItems='center'
        height='100px'
        sx={{ background: 'black' }}
        onClick={closeSearchBar}
      >
        {media.backdrop_path ? (
          <img
            layout='fill'
            style={{
              position: 'absolute',
              top: '0',
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
            }}
            src={`https://image.tmdb.org/t/p/w780${media.backdrop_path}`}
            alt={media.title || media.name}
          />
        ) : null}
        <Box
          width='100%'
          height='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            background: '#00000088',
            zIndex: 1,
            transition: 'background .2s',
            ':hover': {
              background: '#00000055',
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              padding: 2,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            textAlign='center'
            variant='h5'
          >
            {media.title || media.name}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}
