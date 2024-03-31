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
      FormHelperTextProps={{ sx: { color: '#aaa' } }}
      {...props}
      variant='filled'
      inputProps={{
        autoComplete: 'off',
        sx: { color: 'white', backgroundColor: '#37465349' },
      }}
    />
  )
}
