import { createMuiTheme } from '@material-ui/core/styles';
import { dashboardConfig } from '../app';

const CUSTOM_PALETTE_6 = {
  primary: {
    main: '#009688',
  },
  secondary: {
    main: '#00594B'
  }
}

const CUSTOM_PALETTE_5 = {
  primary: {
    main: '#E91E63'
  },
  secondary: {
    main: '#AC0026'
  }
}

const CUSTOM_PALETTE_4 = {
  primary: {
    main: '#FF5722'
  },
  secondary: {
    main: '#E03803'
  }
}

const CUSTOM_PALETTE_3 = {
  primary: {
    main: '#455A64'
  },
  secondary: {
    main: '#081D27'
  }
}

const CUSTOM_PALETTE_2 = {
  primary: {
    main: '#D32F2F'
  },
  secondary: {
    main: '#960000'
  }
}

const CUSTOM_PALETTE_1 = {
  primary: {
    main: '#3F51B5'
  },
  secondary: {
    main: '#669966'
  }
}

const SCIREC_PALETTE = {
  primary: {
    main: '#0097a7'
  },
  secondary: {
    main: '#669966'
  }
}

const LOADING_PALETTE = {
  primary: {
    main: '#6E6E6E'
  },
  secondary: {
    main: '#424242'
  }
}

const createAppTheme = (palette, inverted) => {
  return inverted ? (
    createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        primary: palette.secondary,
        secondary: palette.primary
      }
    })
  ) : (
    createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette
    })
  )
}


export const getAppTheme = (dashboard, isAuth, isDashboardLoading, themePicker) => {
  if ((isAuth && !dashboard) || isDashboardLoading) {
    return createAppTheme(LOADING_PALETTE);
  }
  else if (isAuth && dashboard) {
    switch (dashboard === dashboardConfig.MAX_COUNT ? themePicker.theme : dashboard.theme.id) {
      case 0:
        return createAppTheme(SCIREC_PALETTE, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      case 1:
        return createAppTheme(CUSTOM_PALETTE_1, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      case 2:
        return createAppTheme(CUSTOM_PALETTE_2, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      case 3:
        return createAppTheme(CUSTOM_PALETTE_3, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      case 4:
        return createAppTheme(CUSTOM_PALETTE_4, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      case 5:
        return createAppTheme(CUSTOM_PALETTE_5, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      case 6:
        return createAppTheme(CUSTOM_PALETTE_6, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
      default:
        return createAppTheme(SCIREC_PALETTE, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
    }
  }
  else {
    return createAppTheme(SCIREC_PALETTE);
  }
}