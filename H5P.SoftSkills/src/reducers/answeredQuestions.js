import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';

export function answeredQuestions (state = initialState.answeredQuestions, action) {
  switch (action.type) {
    case types.question.ANSWER: {
      const { questionGlobalIndex, answerId } = action;
      let nextState = [...state];
      const answerIndex= nextState.findIndex(
        answer => (answer.questionGlobalIndex === questionGlobalIndex)
      )
      if (answerIndex === -1) {
        nextState.push({
            answerId: answerId,
            questionGlobalIndex:  Number.parseInt(questionGlobalIndex)
          }
        );
      } else {
        let newAnswer = { ... nextState[answerIndex]}; // Make a copy
        newAnswer.answerId = answerId;
        nextState[answerIndex] = newAnswer;
      }
      return nextState;
    }
    case types.questionnaire.INIT_USER_DATA:
      return [...action.answeredQuestions];
    default:
      return state;
  }
}
