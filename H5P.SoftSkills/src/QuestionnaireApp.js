import React from 'react';
import Questionnaire from './containers/Questionnaire';
import { Provider } from 'react-redux';
import { questionnaireTheme } from './settings/questionnaireTheme';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  questionnaireCompetenciesQuestionsDefault, questionnaireResourceDefault,
  questionnaireSettings,
  questionsByCompetencyAndSubCompetencies
} from './utils/CommonProptypes';
import { questionnaireStore } from './utils/ReduxUtils';

export const QuestionnaireApp = (props) => {

  return (
    <ThemeProvider theme={questionnaireTheme}>
      <Provider store={questionnaireStore}>
        <Questionnaire {...props} />
      </Provider>
    </ThemeProvider>);
};

QuestionnaireApp.propTypes = {
  currentStep: PropTypes.string,
  contentId: PropTypes.string,
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireSettings
};
QuestionnaireApp.defaultProps = {
  currentStep: '',
  contentId: '',
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireResourceDefault
};
