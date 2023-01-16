import { styled, IconButton, Checkbox } from '@mui/material'

export const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
        position: relative;
        width: 80px;
        height: 80px;
        background: #ffffff;
        padding: 0 20px;
        overflow: hidden;
        transition: background 0.3s;
        :hover {
            background: #818181;
        }
        &.MuiButtonBase-root {
          min-height: 80px;
        }
    `,
)

export const StyledCheckbox = styled(Checkbox)(
  ({ theme }) => `
      &.Mui-checked {
        color:#8888ffdd;
      }
      `,
)
