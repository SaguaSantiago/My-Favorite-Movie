import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import StarIcon from '@mui/icons-material/Star'
import ExplicitIcon from '@mui/icons-material/Explicit'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import TheatersIcon from '@mui/icons-material/Theaters'

export const FEATURES_OBJECTS = [
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
  {
    name: 'First air date',
    key: 'first_air_date',
    icon: CalendarMonthIcon,
  },
  {
    name: 'Runtime',
    key: 'episode_run_time',
    icon: AccessTimeFilledIcon,
  },
  {
    name: 'Episodes',
    key: 'number_of_episodes',
    icon: SlideshowIcon,
  },
  {
    name: 'Seasons',
    key: 'number_of_seasons',
    icon: TheatersIcon,
  },
]
