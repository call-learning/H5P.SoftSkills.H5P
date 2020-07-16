import React from 'react';
import {
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourceDefault,
  questionnaireResources,
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
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetQuestionnaireAndPosition, startQuestionnaireAndPosition } from '../actions/questionnaire';


function Questionnaire (props) {
  let currentPage = (<InstructionPageContainer {...props.settings} isReadyToStart={false}/>);

  switch (props.currentStep) {
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
            <RoutedResultsPageContainer possibleAnswers={props.settings.possibleAnswers}
                                        {...props}
                                        handleReviewQuestionnaire={
                                          () => (props.dispatch(startQuestionnaireAndPosition()))}
                                        handleRestartQuestionnaire={
                                          () => (props.dispatch(resetQuestionnaireAndPosition()))}
            />
      );
  }

  return (<Container maxWidth={false} disableGutters={true}>{currentPage}</Container>);
}

Questionnaire.propTypes = Object.assign({
    currentStep: PropTypes.string,
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireSettings,
  questionnaireResources
);
Questionnaire.defaultProps = Object.assign({
    currentStep: ''
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourceDefault,
  questionnaireSettingsDefault
);

export default connect((state) => ({...state}))(Questionnaire);


