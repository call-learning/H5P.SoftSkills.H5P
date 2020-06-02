import React from 'react';
import CompetencyPage from './CompetencyPage';
import { sampleData } from '../../utils/StoriesUtils';
import Box from '@material-ui/core/Box';

export default { title: 'Questionnaire' };

export const simpleCompetencyPage = () =>
  (<Box maxHeight="800px">
    <CompetencyPage questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
                   currentCompetencyIndex={1}
                   subCompetencyProgressInCompetency={[100,0,0]}
  /></Box>);


