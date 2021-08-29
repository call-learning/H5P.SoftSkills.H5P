import { connect } from 'react-redux';
import { RoutedResultsPage } from '../components/results/ResultsPages';
import React from 'react';
import PropTypes from 'prop-types';
import {
  questionnaireCompetenciesQuestionsDefault,
  questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies
} from '../utils/CommonProptypes';

const mapStateToProps = (state) => {
  return { ...state };
};

const RoutedResultsPageContainer = (props) => {
  return (<RoutedResultsPage {...props}/>);
};

RoutedResultsPageContainer.propTypes = {
  handleReviewQuestionnaire: PropTypes.func,
  handleRestartQuestionnaire: PropTypes.func,
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireSettings
};

RoutedResultsPageContainer.defaultProps = {
  handleReviewQuestionnaire: () => null,
  handleRestartQuestionnaire: () => null,
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireSettingsDefault
};

export default connect(mapStateToProps)(RoutedResultsPageContainer);

