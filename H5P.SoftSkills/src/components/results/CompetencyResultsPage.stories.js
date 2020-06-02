// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import { computeProgressPerCompetency, getTotalQuestionCount } from '../../utils/ComponentsUtils';
import CompetencyResultsPage from './CompetencyResultsPage';


export default { title: 'Results' };


const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings.possibleAnswers
);

export const competencyResultsPage = () => <CompetencyResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  results={allCompetenciesResults}
  competencyIndex={1}
/>;
