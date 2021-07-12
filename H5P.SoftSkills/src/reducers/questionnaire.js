import initialState from '../constants/initialState'
import * as types from '../constants/actionTypes'
import {
  QSTEP_FINISHED,
  QSTEP_READY_TO_START,
  QSTEP_REVIEWING,
  QSTEP_STARTED
} from '../constants/QuestionnaireConstants'
import { getGlobalQuestionIndex, getTotalQuestionCount } from '../utils/ComponentsUtils'

/**
 *
 * Make sure the context is in the reducer so we know how to paginate
 *
 */
export function currentStep (state = initialState.currentStep, action) {
  switch (action.type) {
    case types.questionnaire.INIT_USER_DATA: {
      return action.currentStep;
    }
    case types.questionnaire.READY_TO_START: {
      return QSTEP_READY_TO_START;
    }
    case types.questionnaire.START: {
      return QSTEP_STARTED;
    }
    case types.questionnaire.FINISH: {
      return QSTEP_FINISHED;
    }
    case types.questionnaire.REVIEW: {
      return QSTEP_REVIEWING;
    }
    case types.questionnaire.RESET: {
      return QSTEP_READY_TO_START;
    }
    default:
      return state;
  }
}

/**
 *
 * Make sure the context is in the reducer so we know how to paginate
 *
 */
export function navigation (state = initialState.navigation, action) {
  // eslint-disable-next-line no-unused-vars
  const { questionGlobalIndex, questionsByCompetencyAndSubCompetencies } = action;

  const maxCompetencyIndex = questionsByCompetencyAndSubCompetencies ? questionsByCompetencyAndSubCompetencies.length : 0;
  switch (action.type) {
    case types.questionnaire.NEXT_COMPETENCY: {
      const nextCompetencyIndex = (state.currentCompetencyIndex < maxCompetencyIndex) ?
        state.currentCompetencyIndex + 1: state.currentCompetencyIndex;
      const nextAvailableQuestionIndex = getGlobalQuestionIndex (questionsByCompetencyAndSubCompetencies,
        nextCompetencyIndex, 0, 0, 0); // Index of the question at the top.
      return {
        questionGlobalIndex : nextAvailableQuestionIndex,
        currentCompetencyIndex: nextCompetencyIndex
      };
    }
    case types.questionnaire.PREVIOUS_COMPETENCY: {
      const prevCompetencyIndex = (state.currentCompetencyIndex > 0)?
        state.currentCompetencyIndex - 1 : state.currentCompetencyIndex;
      const nextAvailableQuestionIndex = getGlobalQuestionIndex (questionsByCompetencyAndSubCompetencies,
        prevCompetencyIndex, 0, 0, 0); // Index of the question at the top
      // So we focus on the first question of the page.
      return { questionGlobalIndex : nextAvailableQuestionIndex,
        currentCompetencyIndex: prevCompetencyIndex };
    }
    case types.questionnaire.RESET_NAVIGATION:
    case types.questionnaire.INIT_USER_DATA:  {
      return { currentCompetencyIndex: 0, questionGlobalIndex: 0 };
    }
    case types.questionnaire.MOVE_NEXT_AVAILABLE_QUESTION: {
      const maxQuestionCount = questionsByCompetencyAndSubCompetencies ? getTotalQuestionCount(questionsByCompetencyAndSubCompetencies) : 0;
      const lastQuestionIndex = action.answeredQuestions.reduce(
        (maxIndex, currentAnswer) => (currentAnswer.questionGlobalIndex > maxIndex ? currentAnswer.questionGlobalIndex : maxIndex),
        0
      );
      return {
        ...state, questionGlobalIndex: lastQuestionIndex < maxQuestionCount ?
          lastQuestionIndex + 1 : lastQuestionIndex
      };
    }
  }
  return state;
}
