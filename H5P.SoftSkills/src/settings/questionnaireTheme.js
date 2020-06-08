import { createMuiTheme } from '@material-ui/core/styles';
import '../Questionnaire.css';

export const questionnaireTheme = createMuiTheme({
  palette: {
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
      main: '#00ca9d'
    },
    text: {
      default: '#4A4A4A',
      primary: '#4A4A4A',
      secondary: '#888A8B'
    },
  },
  typography: {
    fontFamily: "'Noto Sans SC', sans-serif"
  },
});
