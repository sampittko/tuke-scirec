import { createMuiTheme } from '@material-ui/core/styles';
import { dashboardConfig } from '../config/app';
import palettes from '../config/mui/palettes';

const createAppTheme = (palette, inverted) => {
  return createMuiTheme(inverted ? ({
      typography: {
        useNextVariants: true
      },
      palette: {
        primary: palette.secondary,
        secondary: palette.primary
      }
    }) : ({
      typography: {
        useNextVariants: true
      },
      palette
    })
  )
}

export const getAppTheme = (dashboard, isAuth, isDashboardLoading, themePicker) => {
  if ((isAuth && !dashboard) || isDashboardLoading) {
    return createAppTheme(palettes.LOADING);
  }
  else if (isAuth && dashboard) {
    let palette;
    switch (dashboard === dashboardConfig.MAX_COUNT ? themePicker.theme : dashboard.data().theme.id) {
      case 0:
        palette = palettes.SCIREC;
        break;
      case 1:
        palette = palettes.CUSTOM_1;
        break;
      case 2:
        palette = palettes.CUSTOM_2;
        break;
      case 3:
        palette = palettes.CUSTOM_3;
        break;
      case 4:
        palette = palettes.CUSTOM_4;
        break;
      case 5:
        palette = palettes.CUSTOM_5;
        break;
      case 6:
        palette = palettes.CUSTOM_6;
        break;
      default:
        palette = palettes.SCIREC;
        break;
    }
    return createAppTheme(palette, dashboard === dashboardConfig.MAX_COUNT ? themePicker.inverted : dashboard.data().theme.inverted);
  }
  else {
    return createAppTheme(palettes.SCIREC);
  }
}