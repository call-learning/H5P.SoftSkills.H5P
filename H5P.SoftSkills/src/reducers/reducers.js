import { combineReducers } from 'redux';
import { answeredQuestions } from './answeredQuestions';
import { currentStep, navigation } from './questionnaire';

export const questionnaireCombinedReducers =
  combineReducers({
    navigation,
    answeredQuestions,
    currentStep
  });

