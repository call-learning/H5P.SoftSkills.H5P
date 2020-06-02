import { connect } from 'react-redux';
import { RoutedResultsPage } from '../components/results/ResultsPages';
import React, { useContext } from 'react';
import { CompetenciesContext } from '../contexts/CompetenciesContext';
import { PossibleAnswersContext } from '../contexts/PossibleAnswersContext';

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};

const RoutedResultsPageContainer = () => {
  const allCompetencies = useContext(CompetenciesContext);
  const allAnswers = useContext(PossibleAnswersContext);
  return (<RoutedResultsPage possibleAnswers={allAnswers} questionsByCompetencyAndSubCompetencies={allCompetencies}/>);
};

export default connect(mapStateToProps)(RoutedResultsPageContainer);

