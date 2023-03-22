import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  StyledEngineProvider,
} from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { lightBlue } from '@mui/material/colors'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  typography: {
    fontFamily: 'Public Sans, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
})

export default function OverrideMuiTheme({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}
