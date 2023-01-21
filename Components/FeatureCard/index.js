import { Box, Card, Typography } from '@mui/material'

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import StarIcon from '@mui/icons-material/Star'
import ExplicitIcon from '@mui/icons-material/Explicit'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

const FEATURES_OBJECTS = [
  {
    name: 'Date',
    key: 'release_date',
    icon: CalendarMonthIcon,
  },
  {
    name: 'Budget',
    key: 'budget',
    icon: AttachMoneyIcon,
  },
  {
    name: 'Revenue',
    key: 'revenue',
    icon: CurrencyExchangeIcon,
  },
  {
    name: 'Runtime',
    key: 'runtime',
    icon: AccessTimeFilledIcon,
  },
  {
    name: 'Votes',
    key: 'vote_average',
    icon: StarIcon,
  },
  {
    name: 'Adult',
    key: 'adult',
    icon: ExplicitIcon,
  },
]

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
          {value}
        </Typography>
      </Card>
    </Box>
  )
}
