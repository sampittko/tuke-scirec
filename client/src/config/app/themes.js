import { createMuiTheme } from '@material-ui/core/styles';

const SCIREC_CUSTOM_THEME_1 = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#669966',
      dark: '#507850',
    },
    secondary: {
      main: '#0097a7',
      dark: '#0a7d89',
    },
  },
});

const SCIREC_THEME = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#0097a7',
      dark: '#0a7d89',
    },
    secondary: {
      main: '#669966',
      dark: '#507850',
    },
  },
});

export const getAppTheme = color => {
  switch (color) {
    case 0:
      return SCIREC_THEME;
    case 1:
      return SCIREC_CUSTOM_THEME_1;
    default:
      return SCIREC_THEME;
  }
}