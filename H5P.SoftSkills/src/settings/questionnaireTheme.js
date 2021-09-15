import { createMuiTheme } from '@material-ui/core/styles';
import '../Questionnaire.css';

const palette = {
  primary: {
    main: '#bb0e29',
    light: '#ff0026'
  },
  secondary: {
    main: '#4A4A4A',
    light: '#888A8B'
  },
  error: {
    main: '#9b3cb7'
  },
  info: {
    main: '#01c3fa'
  },
  success: {
    main: '#7ED321'
  },
  warning: {
    main: '#F5A623'
  },
  text: {
    default: '#4A4A4A',
    primary: '#4A4A4A',
    secondary: '#888A8B'
  },
};

export const questionnaireTheme = createMuiTheme({
  palette: palette,
  typography: {
    fontFamily: '\'Gandhi Sans SC\', sans-serif',
    h3: {
      fontSize: '2.1rem',
    },
    h4: {
      fontSize: '1.4rem',
    },
    subtitle1: {
      fontSize: '1.4rem',
    },
    subtitle2: {
      fontSize: '1.1rem',
      marginBottom: '1.2em'
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 'bold'
    },
  },

  overrides: {
    MuiTypography: {
      subtitle2: {
        position: "relative",
        '&::after': {
          content: "' '",
          position: 'absolute',
          display: 'block',
          width: '3em',
          marginTop: '0.3em',
          border:  `2px solid ${palette.primary.main}`,
          background: `${palette.primary.main}`,
          borderRadius: '4px',
          boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .05)'
        }
      }
    }
  }
});
