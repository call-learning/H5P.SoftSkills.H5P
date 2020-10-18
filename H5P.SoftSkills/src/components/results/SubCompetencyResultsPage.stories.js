// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import { getTotalQuestionCount } from '../../utils/ComponentsUtils';
import SubCompetencyResultsPage from './SubCompetencyResultsPage';

export default { title: 'Results' };


export const subCompetencyResultsPage = () => <SubCompetencyResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  settings={sampleData.settings}
  answeredQuestions={sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies))}
  subCompetencyIndex={0}
  competencyIndex={1}
  resources={sampleData.resources}
/>;

export const subCompetencyResultsPageEmptyRessources = () => <SubCompetencyResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  settings={sampleData.settings}
  answeredQuestions={sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies))}
  subCompetencyIndex={1}
  competencyIndex={2}
  resources={sampleData.resources}
/>;
