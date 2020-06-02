import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';
import { QSTEP_FINISHED, QSTEP_NOT_STARTED, QSTEP_REVIEWING, QSTEP_STARTED } from '../constants/QuestionnaireConstants';
import { getTotalQuestionCount } from '../utils/ComponentsUtils';

/**
 *
 * Make sure the context is in the reducer so we know how to paginate
 *
 */
export function currentStep (state = initialState.currentStep, action) {
  switch (action.type) {
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
      return QSTEP_REVIEWING;
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
  const { questionGlobalIndex, questionsByCompetencyAndSubCompetencies } = action;

  const maxCompetencyIndex = questionsByCompetencyAndSubCompetencies ? questionsByCompetencyAndSubCompetencies.length : 0;
  switch (action.type) {
    case types.questionnaire.NEXT_COMPETENCY: {
      const nextCompetencyIndex = state.currentCompetencyIndex + 1;
      return {
        ...state,
        currentCompetencyIndex: (nextCompetencyIndex < maxCompetencyIndex) ? nextCompetencyIndex : state.currentCompetencyIndex
      };
    }
    case types.questionnaire.PREVIOUS_COMPETENCY: {
      const prevCompetencyIndex = state.currentCompetencyIndex - 1;
      return { ...state, currentCompetencyIndex: (prevCompetencyIndex > 0) ? prevCompetencyIndex : 0 };
    }
    case types.questionnaire.RESET_NAVIGATION: {
      return { currentCompetencyIndex: 0, questionGlobalIndex: 0 };
    }
    case types.questionnaire.MOVE_NEXT_AVAILABLE_QUESTION: {
      const maxQuestionCount = questionsByCompetencyAndSubCompetencies ? getTotalQuestionCount(questionsByCompetencyAndSubCompetencies) : 0;
      const lastQuestionIndex = action.answeredQuestions.reduce(
        (maxIndex, currentAnswer) => (currentAnswer.questionGlobalIndex > maxIndex ? currentAnswer.questionGlobalIndex : maxIndex),
        0
      );
      const newState = {...state, questionGlobalIndex: lastQuestionIndex < maxQuestionCount ?
            lastQuestionIndex + 1 : lastQuestionIndex
        };
      return newState;
    }
  }
  return state;
}
