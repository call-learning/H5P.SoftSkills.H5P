import React, { useContext, useEffect } from 'react';
import Questionnaire from './containers/Questionnaire';
import { Provider } from 'react-redux';
import { questionnaireTheme } from './settings/questionnaireTheme';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  questionnaireCompetenciesQuestionsDefault, questionnaireResourceDefault,
  questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies
} from './utils/CommonProptypes';
import { questionnaireStore } from './utils/ReduxUtils';
import { initializeUserData } from './actions/questionnaire';
import { H5PContext } from './contexts/H5PContext';

export const QuestionnaireApp = (props) => {
  const h5pContext = useContext(H5PContext);
  const dispatch = useDispatch();

 useEffect(() => {
   dispatch(initializeUserData(h5pContext.contentId));
 }, [])

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
