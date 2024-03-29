import React from 'react';
import CompetencyPage from './CompetencyPage';
import { sampleData } from '../../utils/StoriesUtils';
import Box from '@material-ui/core/Box';

export default { title: 'Questionnaire/Page' };

export const simpleCompetencyPage = () =>
  (<Box height="1200px" position="relative">
    <CompetencyPage
      questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
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
    </Box>
  )

export const simpleCompetencyPageSecondPart = () =>
  (<Box height="1200px" position="relative">
    <CompetencyPage
      questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
      currentCompetencyIndex={2}
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
    </Box>
  )


