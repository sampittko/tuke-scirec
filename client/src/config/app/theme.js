import { createMuiTheme } from '@material-ui/core/styles';

export const SCIREC_THEME = createMuiTheme({
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