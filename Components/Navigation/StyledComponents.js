import { styled } from "@mui/material";

export const BackgroundFade = styled('div')(
    ({ theme }) => `
    position: absolute;
    height: calc(100% - 81px);
    width: 100%;
    z-index: 1;
    background: #00000044;
    @media (min-width: 0px) {
      height: calc(100% - 59px)
    }
    @media (min-width: 600px) {
        height: calc(100% - 64px)
    }
  `,
  )