import React from 'react';
import { Box } from '@material-ui/core';
import H5P from '../../utils/H5P.mock';
import { computeProgressPerCompetency, getTotalQuestionCount } from '../../utils/ComponentsUtils';
import { sampleAnswerGenerator, sampleData } from '../../utils/StoriesUtils';
import ResultRadarChart from './ResultRadarChart';

export default { title: 'Widget' };

window.H5P = H5P;

const allCompetenciesResults = computeProgressPerCompetency(
  sampleData.questionsByCompetencyAndSubCompetencies,
  sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)),
  sampleData.settings
);


export const resultRadarChart = () => (<Box display="flex" flexDirection="column">
  <ResultRadarChart resultsList={allCompetenciesResults.competenciesResults[1].subCompetenciesResults}/>
</Box>);

export const resultRadarChartWithLabels = () => (<Box display="flex" flexDirection="column">
  <ResultRadarChart resultsList={allCompetenciesResults.competenciesResults[1].subCompetenciesResults}
                    hasLabels graphSize={200}/>
</Box>);
