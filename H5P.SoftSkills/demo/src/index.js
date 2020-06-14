import React, { Component } from 'react';
import { render } from 'react-dom';
import { questionnaireStore } from '../../src/utils/ReduxUtils';
import { initializeUserData } from '../../src/actions/questionnaire';
import { Provider } from 'react-redux';
import sampleData from '../../sampleData/demotestdata.json';
import { QuestionnaireApp } from '../../src/QuestionnaireApp';
import { TranslationsContext } from '../../src/contexts/TranslationsContext';

window.H5P = H5P;



const questionnaireData = {
  questionsByCompetencyAndSubCompetencies: sampleData.questionsByCompetencyAndSubCompetencies,
  settings: sampleData.settings,
  resources: sampleData.resources,
};

export default class Demo extends Component {
  render () {
    questionnaireStore.dispatch(initializeUserData(''));
    return (
      <TranslationsContext.Provider value={sampleData.l10n}>
      <Provider store={questionnaireStore}>
      <QuestionnaireApp {...questionnaireData} />
    </Provider>
      </TranslationsContext.Provider>)
  }
}

render(<Demo/>, document.querySelector('#demo'));

