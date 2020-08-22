// Set the basic translations
import { sampleAnswerGenerator } from '../../utils/StoriesUtils';
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import { getTotalQuestionCount } from '../../utils/ComponentsUtils';
import SubCompetencyResultsList from './SubCompetencyResultsList';

export default { title: 'Results/Widget' };

const sampleAnswers = sampleAnswerGenerator(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies));

export const subCompetencyResultsList = () => {
  return (<SubCompetencyResultsList competencyIndex={0}
                                    subCompetencyIndex={0}
                                    questionsByCompetencyAndSubCompetencies={sampleData.questionsByCompetencyAndSubCompetencies}
                                    settings={sampleData.settings}
                                    answeredQuestions={sampleAnswers}
                                    questionnaireResources={sampleData.resources}
  />);
};

