import { question, questionnaire } from '../constants/actionTypes';
import { answerQuestion } from './question';

/*
 * action creators
 */

export function startQuestionnaire () {
  return { type: questionnaire.START };
}

export function finishQuestionnaire () {
  return {
    type: questionnaire.FINISH
  };
}


export function startReviewQuestionnaire () {
  return {
    type: questionnaire.FINISH
  };
}

export function reviewQuestionnaire () {
  return {
    type: questionnaire.REVIEW
  };
}


export function resetQuestionnaire () {
  return {
    type: questionnaire.RESET
  };
}


export function nextCompetency (questionsByCompetencyAndSubCompetencies) {
  return { type: questionnaire.NEXT_COMPETENCY, questionsByCompetencyAndSubCompetencies: questionsByCompetencyAndSubCompetencies};
}

export function previousCompetency (questionsByCompetencyAndSubCompetencies) {
  return { type: questionnaire.PREVIOUS_COMPETENCY, questionsByCompetencyAndSubCompetencies: questionsByCompetencyAndSubCompetencies };
}

export function setNextOpenQuestionPosition(questionGlobalIndex, questionsByCompetencyAndSubCompetencies, answeredQuestions) {
  return {
    type: questionnaire.MOVE_NEXT_AVAILABLE_QUESTION,
    questionGlobalIndex:questionGlobalIndex,
    questionsByCompetencyAndSubCompetencies: questionsByCompetencyAndSubCompetencies,
    answeredQuestions: answeredQuestions,
  };
}

export function resetNavigation () {
  return {
    type: questionnaire.RESET_NAVIGATION
  };
}


/** Thunk types of actions */
export function startQuestionnaireAndPosition() {
  return function(dispatch) {
    return Promise.all([
      dispatch(resetNavigation()),
      dispatch(startQuestionnaire())])
  };
}
export function answerQuestionAndNavigateToNext(questionGlobalIndex,answerId, questionsByCompetencyAndSubCompetencies) {
  return function(dispatch, getState) {
    return dispatch(answerQuestion(questionGlobalIndex, answerId)).then(
      dispatch(setNextOpenQuestionPosition(questionGlobalIndex, questionsByCompetencyAndSubCompetencies, getState().answeredQuestions)))
  };
}
