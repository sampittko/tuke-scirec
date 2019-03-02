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
    let palette;
    switch (dashboard === dashboardConfig.MAX_COUNT ? themePicker.theme : dashboard.theme.id) {
      case 0:
        palette = SCIREC_PALETTE;
        break;
      case 1:
        palette = CUSTOM_PALETTE_1;
        break;
      case 2:
        palette = CUSTOM_PALETTE_2;
        break;
      case 3:
        palette = CUSTOM_PALETTE_3;
        break;
      case 4:
        palette = CUSTOM_PALETTE_4;
        break;
      case 5:
        palette = CUSTOM_PALETTE_5;
        break;
      case 6:
        palette = CUSTOM_PALETTE_6;
        break;
      default:
        palette = SCIREC_PALETTE;
        break;
    }
    return createAppTheme(palette, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.theme.inverted);
  }
  else {
    return createAppTheme(SCIREC_PALETTE);
  }
}