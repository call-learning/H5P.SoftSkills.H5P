import React from 'react';
import CompetencyPage from './CompetencyPage';
import { sampleData } from '../../utils/StoriesUtils';

export default { title: 'Questionnaire' };

export const simpleCompetencyPage = () =>
  (<CompetencyPage questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
                   currentCompetencyIndex={1}
                   subCompetencyProgressInCompetency={[100,0,0]}
  />);


