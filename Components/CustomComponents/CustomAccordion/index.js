
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Chip,
} from '@mui/material'

export default function CustomAccordion({ items, selectedItems }) {

  return (
    <Accordion>
      <AccordionSummary
        sx={{ background: '#525252', color: 'white' }}
        expandIcon={<ExpandMoreOutlined />}
      >
        <Typography textAlign='center'>
          {
            typeof selectedItems !== 'string' ? selectedItems.map((e) => e) : selectedItems
          }
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        component='div'
        sx={{ background: '#525252', color: 'white', borderTop: '1px solid #bbbbbb' }}
      >
        <Grid container gap={1} justifyContent='center'>
          {
            items.map((e) => e)
          }
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
