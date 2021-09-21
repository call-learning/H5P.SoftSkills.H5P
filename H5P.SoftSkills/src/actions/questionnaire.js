import { questionnaire } from '../constants/actionTypes';
import { answerQuestion } from './question';
import {} from 'global'

/*
 * action creators
 */
export function initializeUserDataQuestionnaire (userCurrentStep, userAnsweredQuestions) {
  return {
    type: questionnaire.INIT_USER_DATA,
    currentStep: userCurrentStep,
    answeredQuestions: userAnsweredQuestions
  };
}

export function displayInstructions () {
  return { type: questionnaire.READY_TO_START };
}

export function startQuestionnaire () {
  return { type: questionnaire.START };
}

export function finishQuestionnaire () {
  return {
    type: questionnaire.FINISH,
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
  return {
    type: questionnaire.NEXT_COMPETENCY,
    questionsByCompetencyAndSubCompetencies: questionsByCompetencyAndSubCompetencies
  };
}

export function previousCompetency (questionsByCompetencyAndSubCompetencies) {
  return {
    type: questionnaire.PREVIOUS_COMPETENCY,
    questionsByCompetencyAndSubCompetencies: questionsByCompetencyAndSubCompetencies
  };
}

export function setNextOpenQuestionPosition (questionGlobalIndex, questionsByCompetencyAndSubCompetencies, answeredQuestions) {
  return {
    type: questionnaire.MOVE_NEXT_AVAILABLE_QUESTION,
    questionGlobalIndex: questionGlobalIndex,
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
export function startQuestionnaireAndPosition (startAction) {
  return function (dispatch) {
    dispatch(resetNavigation());
    dispatch(startQuestionnaire());
    if (startAction) {
      startAction();
    }
  };
}

/** Thunk types of actions */
export function resetQuestionnaireAndPosition () {
  return function (dispatch) {
    dispatch(resetNavigation());
    dispatch(resetQuestionnaire());
  };
}

export function answerQuestionAndNavigateToNext (questionGlobalIndex, answerId, questionsByCompetencyAndSubCompetencies) {
  return function (dispatch, getState) {
    dispatch(answerQuestion(questionGlobalIndex, answerId));
    dispatch(setNextOpenQuestionPosition(questionGlobalIndex,
      questionsByCompetencyAndSubCompetencies,
      getState().answeredQuestions))
  };
}

/**
 * Finish the questionnaire and save state
 * @param finishAction the callback action to call with current state
 * @return {function(*, *): Promise}
 */
export function finishQuestionnaireAndSaveData (finishAction) {
  return async (dispatch, getState) => {
    dispatch(finishQuestionnaire());
    if (finishAction) {
      finishAction(getState(), 'userState');
    }
  };
}

/**
 * Try to initialize results
 * @param h5pContentId
 * @param h5pDataID
 * @return {function(...[*]=)}
 */
export function initializeUserData (h5pContentId = '', h5pDataID = 'userState') {
  return (dispatch) =>
    new Promise(
      (resolve) => {
        if (window.H5P && window.H5P.getUserData && h5pContentId) {
          window.H5P.getUserData(h5pContentId, h5pDataID, (error, userdata) => resolve(userdata));
        } else {
          resolve();
        }
      }).then(
      (userData) => {
        if (userData && userData.currentStep && userData.answeredQuestions) {
          dispatch(initializeUserDataQuestionnaire(userData.currentStep, userData.answeredQuestions));
        } else {
          dispatch(displayInstructions(true));
        }
      }
    );
}
