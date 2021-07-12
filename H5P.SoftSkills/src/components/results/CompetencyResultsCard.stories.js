// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import CompetencyResultsCard from './CompetencyResultsCard';
import { computeProgressPerCompetency, getTotalQuestionCount } from '../../utils/ComponentsUtils';

export default { title: 'Results/Widget' };

const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings
);

export const competencyResultsWidget = () => <CompetencyResultsCard
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  results={allCompetenciesResults}
  competencyIndex={1}
/>;
