import { FEATURES_OBJECTS } from 'Utilities/objects'

import { Box, Card, Typography } from '@mui/material'

export default function FeaturesCard({ value, featureKey }) {
  const { name, icon: Icon } = FEATURES_OBJECTS.find((feature) => feature.key === featureKey)

  return (
    <Box width='100px' margin='0 auto'>
      <Card
        sx={{
          height: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '8px',
          color: 'white',
          backgroundColor: '#305b74bf',
        }}
      >
        <Box display='flex' flexDirection='column'>
          <Icon sx={{ margin: '0 auto', height: '45px', width: '45px' }} />
          <Typography textAlign='center' variant='overline'>
            {name}
          </Typography>
        </Box>
        <Typography variant='body2' textAlign='center'>
          {value || 'Unknown'}
        </Typography>
      </Card>
    </Box>
  )
}
