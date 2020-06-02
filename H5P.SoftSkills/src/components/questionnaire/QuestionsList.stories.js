import React from 'react';

import QuestionsList from './QuestionsList';
import { sampleData, samplePossibleAnswers, SampleQuestionHandler } from '../../utils/StoriesUtils';

export default { title: 'Questionnaire/Question' };

export const listOfQuestions = () => <QuestionsList
  possibleAnswers={samplePossibleAnswers}
  competencyIndex={0}
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  questionComponent={SampleQuestionHandler}
/>;

