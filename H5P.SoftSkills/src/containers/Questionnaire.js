import React from 'react';
import {
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourceDefault,
  questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies,
} from '../utils/CommonProptypes';
import {
  QSTEP_FINISHED,
  QSTEP_REVIEWING,
  QSTEP_STARTED, QSTEP_READY_TO_START
} from '../constants/QuestionnaireConstants';
import { PossibleAnswersContext } from '../contexts/PossibleAnswersContext';
import { CompetenciesContext } from '../contexts/CompetenciesContext';
import CompetencyPageContainer from './CompetencyPageContainer';
import InstructionPageContainer from './InstructionPageContainer';
import CongratulationsPageContainer from './CongratulationsPageContainer';
import RoutedResultsPageContainer from './RoutedResultsPageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuestionnaireAndPosition, startQuestionnaireAndPosition } from '../actions/questionnaire';
import Box from '@material-ui/core/Box';

function Questionnaire (props) {
  let currentPage = (<InstructionPageContainer {...props.settings} isReadyToStart={false}/>);
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.currentStep)

  switch (currentStep) {
    case QSTEP_READY_TO_START:
      currentPage = (<InstructionPageContainer {...props.settings}/>);
      break;
    case QSTEP_STARTED:
      currentPage =
        (<PossibleAnswersContext.Provider value={props.settings.possibleAnswers}>
          <CompetenciesContext.Provider value={props.questionsByCompetencyAndSubCompetencies}>
            <CompetencyPageContainer/>
          </CompetenciesContext.Provider>
        </PossibleAnswersContext.Provider>); // Inject the information to lower components for navigation and question
      // answers
      break;
    case QSTEP_FINISHED:
      currentPage =
        (<CongratulationsPageContainer/>);
      break;
    case QSTEP_REVIEWING:
      currentPage = (
        <RoutedResultsPageContainer {...props}
                                    handleReviewQuestionnaire={
                                      () => (dispatch(startQuestionnaireAndPosition()))}
                                    handleRestartQuestionnaire={
                                      () => (dispatch(resetQuestionnaireAndPosition()))}
        />
      );
  }
  // The maxheight 100vh is to ensure there will be a scrollbar on Moodle if content goes over the size of the iframe.
  return (<Box id={'sokaApplicationContainer'}>{currentPage}</Box>);
}

Questionnaire.propTypes = {
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireSettings,
};
Questionnaire.defaultProps = {
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireSettingsDefault
};

export default Questionnaire;


