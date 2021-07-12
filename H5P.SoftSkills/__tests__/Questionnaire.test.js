import React from 'react'
import H5P from '../src/utils/H5P.mock';
import { sampleData } from '../src/utils/StoriesUtils';
import Questionnaire from '../src/containers/Questionnaire';
import { questionnaireStore } from '../src/utils/ReduxUtils';
import { Provider } from 'react-redux';
import { afterEach } from '@jest/globals';
import {cleanup, render} from '@testing-library/react';
import { initializeUserData } from '../src/actions/questionnaire';

window.H5P = H5P;

const smallerQuestionnaireData = {
  questionsByCompetencyAndSubCompetencies:
    sampleData.questionsByCompetencyAndSubCompetencies.map(
      (competency) => ({ ...competency, ...{subCompetencies: competency.subCompetencies.splice(1)}})
    ),
  settings: sampleData.settings,
  resources: sampleData.resources,
};

afterEach(cleanup);


test('Questionnaire', () => {
  questionnaireStore.dispatch(initializeUserData(''));
  const {container} = render(<Provider store={questionnaireStore}><Questionnaire {...smallerQuestionnaireData} /></Provider>);
  expect(container.innerHTML).toContain('Test d\'auto-positionnement sur les soft skills.');
})
