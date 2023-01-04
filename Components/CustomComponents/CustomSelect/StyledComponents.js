import { InputBase, styled } from '@mui/material'

export const SelectInput = styled(InputBase)(
  ({bg}) => `
    & .MuiInputBase-input {
      box-sizing: border-box;
  
      background-color: ${ bg || '#393939'};
      height: 40px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 15px;
      font-family: 'open sans', sans-serif;
      width: 192px;
      color: white;
    
    }
    & .MuiSelect-icon {
      color: #fff;
    }
  `,
)
