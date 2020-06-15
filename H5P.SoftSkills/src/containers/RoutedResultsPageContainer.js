import { connect } from 'react-redux';
import { RoutedResultsPage } from '../components/results/ResultsPages';
import React from 'react';
import PropTypes from 'prop-types';
import {
  possibleAnswers,
  possibleAnswersDefault,
  questionnaireCompetenciesQuestionsDefault, questionnaireResourceDefault,
  questionnaireResources,
  questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies
} from '../utils/CommonProptypes';

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};

const RoutedResultsPageContainer = (props) => {
  return (<RoutedResultsPage {...props}/>);
};

RoutedResultsPageContainer.propTypes = Object.assign({
    handleReviewQuestionnaire: PropTypes.func,
    handleRestartQuestionnaire: PropTypes.func
  },
  possibleAnswers,
  questionsByCompetencyAndSubCompetencies,
  questionnaireSettings,
  questionnaireResources
);

RoutedResultsPageContainer.defaultProps = Object.assign({
    handleReviewQuestionnaire: () => null,
    handleRestartQuestionnaire: () => null
  },
  possibleAnswersDefault,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourceDefault,
  questionnaireSettingsDefault
);


export default connect(mapStateToProps)(RoutedResultsPageContainer);

