import React, { useContext } from 'react';
import Questionnaire from './containers/Questionnaire';
import { Provider } from 'react-redux';
import { questionnaireTheme } from './settings/questionnaireTheme';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  questionnaireCompetenciesQuestionsDefault, questionnaireResourceDefault,
  questionnaireResources,
  questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies
} from './utils/CommonProptypes';
import { questionnaireStore } from './utils/ReduxUtils';
import { initializeUserData } from './actions/questionnaire';
import { CompetenciesContext } from './contexts/CompetenciesContext';
import { H5PContext } from './contexts/H5PContext';

export const QuestionnaireApp = (props) => {
  const h5pContext = useContext(H5PContext);
  questionnaireStore.dispatch(initializeUserData(h5pContext.contentId));
  return (
    <ThemeProvider theme={questionnaireTheme}>
      <Provider store={questionnaireStore}>
        <Questionnaire {...props} />
      </Provider>
    </ThemeProvider>);
};

QuestionnaireApp.propTypes = Object.assign({
    currentStep: PropTypes.string,
    contentId: PropTypes.string
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireSettings,
  questionnaireResources
);
QuestionnaireApp.defaultProps = Object.assign({
    currentStep: '',
    contentId: ''
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourceDefault,
  questionnaireSettingsDefault
);
