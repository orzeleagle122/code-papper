import { createTheme } from '@mui/material';

export const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    background: {
      default: '#0B0F19',
      paper: '#111827',
    },
    text: {
      primary: '#EDF2F7',
      secondary: '#EDF2F7',
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375,
    },
  },

  components: {
    //wlasne style
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          backgroundColor: 'rgb(11, 15, 25)',
        },
      },
    },
    //dodatkowe style komponentow mui
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#111827"
        },
        icon: {
          color: 'white',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0px 24px',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
        title: {
          fontSize: '1.8rem',
        },
      },
    },
  },
});
