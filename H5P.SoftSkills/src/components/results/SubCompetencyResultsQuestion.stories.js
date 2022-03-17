// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import { getSubCompetencyResultsAndResources, getTotalQuestionCount } from '../../utils/ComponentsUtils';
import SubCompetencyResultsQuestion from './SubCompetencyResultsQuestion';

export default { title: 'Results/Widget' };

const sampleAnswers = sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies));
const resultsAndResources = getSubCompetencyResultsAndResources(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswers,
  sampleData.settings,
  0,
  0);

export const subCompetencyResultsQuestion = () => {
  return (
    <div>
      <SubCompetencyResultsQuestion
        questionIndex={0}
        questionData={resultsAndResources[0].questionsAnswers[0]}
        settings={sampleData.settings}
      />
      <SubCompetencyResultsQuestion
        questionIndex={2}
        questionData={resultsAndResources[0].questionsAnswers[2]}
        settings={sampleData.settings}
      />
    </div>
  );
};

