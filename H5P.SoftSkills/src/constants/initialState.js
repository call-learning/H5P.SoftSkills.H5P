/**
 * Initial state for the redux store
 * @type {Object}
 */
import { INDEX_NO_VALUE, QSTEP_APP_STARTED } from './QuestionnaireConstants';

export default {
    currentStep: QSTEP_APP_STARTED,
    navigation : {
        questionGlobalIndex: INDEX_NO_VALUE,
        currentCompetencyIndex: INDEX_NO_VALUE,
    }, // Current position in the questionnaire (used for answering question and review)
    answeredQuestions: [],
};
