import React from 'react';
import Questionnaire from './containers/Questionnaire';
import { Provider } from 'react-redux';
import { store } from './utils/ReduxUtils';
import { questionnaireTheme } from './settings/questionnaireTheme';
import { ThemeProvider } from '@material-ui/styles';
import translations from '../demo/src/translations.json';
import { TranslationsContext } from './contexts/TranslationsContext';

export const QuestionnaireApp = (props) =>
  (
    <ThemeProvider theme={questionnaireTheme}>
      <TranslationsContext.Provider value={props.l10n}>
        <Provider store={store}>
          <Questionnaire {...props} />
        </Provider>
      </TranslationsContext.Provider>
    </ThemeProvider>
  );
