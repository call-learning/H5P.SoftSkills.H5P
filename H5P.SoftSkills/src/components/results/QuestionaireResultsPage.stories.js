// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import QuestionnaireResultsPage from './QuestionaireResultsPage';
import { computeProgressPerCompetency, getTotalQuestionCount } from '../../utils/ComponentsUtils';


export default { title: 'Results' };

const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings
);


export const questionnaireResults = () => <QuestionnaireResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  results={allCompetenciesResults}
/>;

export const questionnaireResultsWithBadge = () => <QuestionnaireResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  results={allCompetenciesResults} isFullyAcquired={true}
/>;
