// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData, sampleAnswerData } from '../../utils/StoriesUtils';
import React from 'react';
import { getTotalQuestionCount } from '../../utils/ComponentsUtils';
import { RoutedResultsPage } from './ResultsPages';

export default { title: 'Results' };

export const resultsPage = () => <RoutedResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  possibleAnswers={sampleData.settings.possibleAnswers}
  answeredQuestions={sampleAnswerData}
  resources={sampleData.resources}
/>;

export const resultsPageRandom = () => <RoutedResultsPage
  questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
  possibleAnswers={sampleData.settings.possibleAnswers}
  answeredQuestions={sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies))}
  resources={sampleData.resources}
/>;
