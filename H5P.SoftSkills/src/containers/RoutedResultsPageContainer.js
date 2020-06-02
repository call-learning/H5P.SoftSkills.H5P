import { connect } from 'react-redux';
import { RoutedResultsPage } from '../components/results/ResultsPages';
import React, { useContext } from 'react';
import { CompetenciesContext } from '../contexts/CompetenciesContext';
import { PossibleAnswersContext } from '../contexts/PossibleAnswersContext';
import { sampleData } from '../utils/StoriesUtils';
import PropTypes from 'prop-types';
import {
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

RoutedResultsPageContainer.propTypes = Object.assign({},
  questionsByCompetencyAndSubCompetencies,
  questionnaireSettings,
  questionnaireResources
);

RoutedResultsPageContainer.defaultProps = Object.assign({},
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourceDefault,
  questionnaireSettingsDefault
);


export default connect(mapStateToProps)(RoutedResultsPageContainer);

