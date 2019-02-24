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

const LOADING_THEME = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#6E6E6E',
      dark: '#6E6E6E',
    },
    secondary: {
      main: '#424242',
      dark: '#424242',
    },
  },
});

export const getAppTheme = (dashboard, isAuth, isDashboardLoading) => {
  if ((isAuth && !dashboard) || isDashboardLoading) {
    return LOADING_THEME;
  }
  else if (isAuth && dashboard) {
    switch (dashboard.color) {
      case 0:
        return SCIREC_THEME;
      case 1:
        return SCIREC_CUSTOM_THEME_1;
      default:
        return SCIREC_THEME;
    }
  }
  else {
    return SCIREC_THEME;
  }
}