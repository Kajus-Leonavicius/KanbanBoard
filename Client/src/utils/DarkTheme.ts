import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1C1B20',
      paper: '#36353A',
    },
    primary: {
      main: '#6B8E23',  // šviesi alyvuogė
      contrastText: '#D9D6CF', // kreminė
    },
    secondary: {
      main: '#77815C',  // žalsvai pilka
      contrastText: '#D9D6CF',
    },
    error: {
      main: '#E57373',
    },
    warning: {
      main: '#E6E27A', // šviesiai geltona akcentas
    },
    text: {
      primary: '#D9D6CF',
      secondary: '#77815C',
    },
  },
})
