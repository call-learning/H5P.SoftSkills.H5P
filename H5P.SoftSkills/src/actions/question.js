import { question } from '../constants/actionTypes';

/*
 * action creators
 */
export function answerQuestion (questionGlobalIndex, answerId) {
  return {
    type: question.ANSWER,
    questionGlobalIndex: questionGlobalIndex,
    answerId: answerId,
  };
}
