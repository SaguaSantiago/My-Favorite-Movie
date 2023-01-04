import { TextField, styled } from '@mui/material'

const StyledTextfield = styled(TextField)(
  ({ theme }) => `
    & .MuiInputLabel-root {
      color: #aaaaaa
    }
    & .MuiInputLabel-root.Mui-focused {
      color: ${theme.palette.primary.light};
  
    }}
    & .
  `,
)

export default function CustomTextField(props) {
  return (
    <StyledTextfield
      {...props}
      variant='filled'
      inputProps={{
        autocomplete: 'off',
        sx: { color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.08)' },
      }}
    />
  )
}
