import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { questionnaireTheme } from '../src/settings/questionnaireTheme';

const themeDecorator = storyFn => (
  <ThemeProvider theme={questionnaireTheme}>{storyFn()}</ThemeProvider>
);

export default themeDecorator;
