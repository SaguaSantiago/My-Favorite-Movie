import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined'
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Box } from '@mui/material'

export default function CustomAccordion({ items, selectedItems }) {
  return (
    <Accordion>
      <AccordionSummary
        sx={(theme) => ({ background: theme.palette.background.paper, color: 'white' })}
        expandIcon={<ExpandMoreOutlined htmlColor='#ffffff' />}
      >
        {typeof selectedItems !== 'string' ? (
          <Box display='flex' gap={1} flexWrap='wrap'>
            {selectedItems.map((e) => e)}
          </Box>
        ) : (
          <Typography textAlign='center'> {selectedItems}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails
        component='div'
        sx={(theme) => ({
          background: theme.palette.background.paper,
          color: 'white',
          borderTop: '1px solid #bbbbbb',
        })}
      >
        <Grid container gap={1} justifyContent='center'>
          {items?.map((e) => e)}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
