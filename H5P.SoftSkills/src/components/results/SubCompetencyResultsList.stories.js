// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import { computeProgressPerCompetency, getTotalQuestionCount } from '../../utils/ComponentsUtils';
import SubCompetencyResultsList from './SubCompetencyResultsList';

export default { title: 'Results/Widget' };

const sampleAnswers = sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies));
const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings.possibleAnswers
);

export const subCompetencyResultsList = () => {
  return (<SubCompetencyResultsList competencyIndex={0}
                                    subCompetencyIndex={0}
                                    questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
                                    possibleAnswers={sampleData.settings.possibleAnswers}
                                    answeredQuestions={sampleAnswers}
                                    questionnaireResources={sampleData.resources}
  />);
};

