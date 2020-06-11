import React from 'react';
import { Box } from '@material-ui/core';
import H5P from '../../utils/H5P.mock';
import ResultBarChart from './ResultBarChart';
import { computeProgressPerCompetency, getTotalQuestionCount } from '../../utils/ComponentsUtils';
import { sampleAnswerGenerator, sampleData } from '../../utils/StoriesUtils';

export default { title: 'Widget' };

window.H5P = H5P;

const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings.possibleAnswers
);


export const resultBarChart = () => (<Box display="flex" flexDirection="column" height="800px">
  <ResultBarChart resultsList={allCompetenciesResults.competenciesResults}/>
</Box>);

export const resultBarChartOnElement = () => (<Box display="flex" flexDirection="column" height="800px">
  <ResultBarChart resultsList={allCompetenciesResults.competenciesResults.slice(0,1)} graphHeight={130} />
</Box>);
