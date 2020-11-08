import React from 'react';
import Questionnaire from './Questionnaire';
import { sampleData } from '../utils/StoriesUtils';
import { Provider } from 'react-redux';
import { questionnaireStore } from '../utils/ReduxUtils';

import H5P from '../utils/H5P.mock';
import { initializeUserData } from '../actions/questionnaire';
import Box from '@material-ui/core/Box';

export default { title: 'Questionnaire' };
window.H5P = H5P;

const questionnaireData = {
  questionsByCompetencyAndSubCompetencies: sampleData.questionsByCompetencyAndSubCompetencies,
  settings: sampleData.settings,
  resources: sampleData.resources,
};

export const fullQuestionnaire = () => {
  questionnaireStore.dispatch(initializeUserData(''));
  return (<Box  height={"900px"} overflow={"auto"}>
    <Provider store={questionnaireStore}>
    <Questionnaire {...questionnaireData} />
  </Provider>
  </Box>);
};
