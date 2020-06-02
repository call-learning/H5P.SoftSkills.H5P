import React from 'react';
import Questionnaire from './Questionnaire';
import { sampleData } from '../utils/StoriesUtils';

import { Provider } from 'react-redux';
import { store } from '../utils/ReduxUtils';

import H5P from '../utils/H5P.mock';

export default { title: 'Questionnaire' };
window.H5P = H5P;


const questionnaireData = {
  questionsByCompetencyAndSubCompetencies: sampleData.questionsByCompetencyAndSubCompetencies,
  settings: sampleData.settings,
  resources: sampleData.resources,
};

export const fullQuestionnaire = () =>
  (<Provider store={store}>
    <Questionnaire {...questionnaireData} />
  </Provider>);
