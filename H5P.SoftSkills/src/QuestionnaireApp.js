import React, { useContext, useEffect } from 'react';
import Questionnaire from './containers/Questionnaire';
import { Provider } from 'react-redux';
import { questionnaireTheme } from './settings/questionnaireTheme';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  questionnaireCompetenciesQuestionsDefault, questionnaireResourceDefault,
  questionnaireResources,
  questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies
} from './utils/CommonProptypes';
import { questionnaireStore } from './utils/ReduxUtils';
import { initializeUserData } from './actions/questionnaire';
import { H5PContext } from './contexts/H5PContext';

export const QuestionnaireApp = (props) => {
  const h5pContext = useContext(H5PContext);
  const { resources, ...otherprops } =  props;
  const dispatch = useDispatch();

  // Use the fact we know the context to try and get the absolute path.
  let resourcesWithAbsoluteURL = resources.map((r)=> {
    let  newResource = Object.assign({}, r);
    newResource.imageUrl = '';
    if (r.image && r.image.path) {
      // eslint-disable-next-line no-undef
      newResource.imageUrl = H5P.getPath(r.image.path, h5pContext.contentId);
    }
    return newResource;
  })

 useEffect(() => {
   dispatch(initializeUserData(h5pContext.contentId));
 }, [])

  return (
    <ThemeProvider theme={questionnaireTheme}>
      <Provider store={questionnaireStore}>
        <Questionnaire resources={resourcesWithAbsoluteURL} {...otherprops} />
      </Provider>
    </ThemeProvider>);
};

QuestionnaireApp.propTypes = {
  currentStep: PropTypes.string,
  contentId: PropTypes.string,
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireSettings,
  ...questionnaireResources
};
QuestionnaireApp.defaultProps = {
  currentStep: '',
  contentId: '',
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireResourceDefault,
  ...questionnaireSettingsDefault
};
