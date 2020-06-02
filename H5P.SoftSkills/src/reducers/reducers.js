import { combineReducers } from 'redux';
import { answeredQuestions } from './answeredQuestions';
import { currentStep, navigation } from './questionnaire';
import reduceReducers from 'reduce-reducers';

export const questionnaireCombinedReducers =
  combineReducers({
    navigation,
    answeredQuestions,
    currentStep
  });

