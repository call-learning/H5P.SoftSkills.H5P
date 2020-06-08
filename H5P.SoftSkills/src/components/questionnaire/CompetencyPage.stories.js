import React from 'react';
import CompetencyPage from './CompetencyPage';
import { sampleData } from '../../utils/StoriesUtils';
import Box from '@material-ui/core/Box';

export default { title: 'Questionnaire' };

export const simpleCompetencyPage = () =>
  (<Box maxHeight="800px">
    <CompetencyPage questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
                    currentCompetencyIndex={1}
                    progressData={{
                      answeredQuestionsCount: 50,
                      questionsCount: 51,
                      competenciesProgress: [{
                        answeredQuestionsCount: 20,
                        questionsCount: 20,
                      },
                        {
                          answeredQuestionsCount: 5,
                          questionsCount: 20,
                        },
                        {
                          answeredQuestionsCount: 5,
                          questionsCount: 11,
                        }
                      ]
                    }}/>
  </Box>);


