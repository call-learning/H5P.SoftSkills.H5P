// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import { computeProgressPerCompetency, getTotalQuestionCount, resourcesPerContext } from '../../utils/ComponentsUtils';
import ResourcesList from './ResourcesList';

export default { title: 'Results/Widget' };

const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings.possibleAnswers
);

export const resourceList = () => {
  const subCompetencyIndex = 0;
  const competencyIndex = 1;
  const targetedResources =
    resourcesPerContext(
      sampleData.resources,
      sampleData.questionsByCompetencyAndSubCompetencies,
      competencyIndex,
      subCompetencyIndex);

  return (<ResourcesList resourcesByContext={targetedResources}/>);
};

