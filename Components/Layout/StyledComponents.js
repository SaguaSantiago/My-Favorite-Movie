import { styled } from '@mui/material'

export const BackgroundFade = styled('div')(
  ({ theme }) => `
    position: fixed;
    height: calc(100% - 81px);
    width: 100%;
    z-index: 1;
    background: #00000044;
    height: 100%;
  `,
)
