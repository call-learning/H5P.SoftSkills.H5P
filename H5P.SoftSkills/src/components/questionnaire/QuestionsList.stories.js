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

/**
 * This is just intended as debug mode so we can export the question positions and hierarchy
 *
 * @return {JSX.Element}
 */
export const flatListQuestion = () =>
  <div>
    {
      sampleData.questionsByCompetencyAndSubCompetencies.map(
        (comp, compIndex) => comp.subCompetencies.map(
          (subcomp, subcompIndex) => subcomp.contexts.map(
            (context, contextIndex) => context.questions.map(
              (qu, questionIndex) =>
                (<div>"{qu.label}",<span>"{compIndex}:{subcompIndex}:{contextIndex}:{questionIndex}"</span></div>)
            )
          )
        )
      )
    }
  </div>;
