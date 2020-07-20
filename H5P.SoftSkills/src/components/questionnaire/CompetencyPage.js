import React from 'react';
import { Grid } from '@material-ui/core';
import {
  getTotalQuestionCountCompetency
} from '../../utils/ComponentsUtils';
import CompetencySideNavigation from './CompetencySideNavigation';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault,
  progressData,
  progressDataDefault

} from '../../utils/CommonProptypes';
import PropTypes from 'prop-types';
import Question from './Question';
import Box from '@material-ui/core/Box';

import { getTotalQuestionCount } from '../../utils/ComponentsUtils';
import QuestionsList from './QuestionsList';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';

function CompetencyPage (props) {
  const competencyIndex = props.currentCompetencyIndex;
  const competencyProgressData = props.progressData
    .competenciesProgress.map((cdata) => (100 * cdata.answeredQuestionsCount / cdata.questionsCount));

  // Competency informations
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[competencyIndex];
  const currentCompetencyProgress = props.progressData.competenciesProgress[competencyIndex];

  return (<Box display="flex" flexDirection="row" maxHeight={'100vh'}>
    <Box mx={1} flex={1}>
      <CompetencySideNavigation
        answeredQuestionsCount={currentCompetencyProgress.answeredQuestionsCount}
        questionsCount={currentCompetencyProgress.questionsCount}
        competencyTitle={currentCompetency.label}
        competencyProgressData={competencyProgressData}
      />
    </Box>
    <Box flex={4} mx={1} overflow={'auto'} id={'competencyPageContainer'}>
      <QuestionsList
        questionComponent={props.questionComponent}
        questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
        competencyIndex={competencyIndex}
        handleEnableQuestion={props.handleEnableQuestion}
        handleSelectAnswer={props.handleSelectAnswer}
      />
      <Box display="flex"
           width="100%"
           justifyContent={"space-between"}
           flexDirection={{xs:'column', sm: 'row'}}
           pb={3}
      >
        <Box alignSelf={"flex-start"} my={1}>
          {
            competencyIndex > 0 ?
              (<NavigationButton isBack
                                 onClick={props.handlePreviousCompetency}><H5PTranslatedText
                text='previouscompetencypage'/>
              </NavigationButton>) : ''
          }
        </Box>
        <Box alignSelf={{xs:'flex-start', sm: 'flex-end'}} my={1}>
          {
            competencyIndex >= (props.questionsByCompetencyAndSubCompetencies.length - 1) ?
              (
                <NavigationButton isNext
                                  onClick={props.handleFinishAndSubmit}>
                  <H5PTranslatedText text='finishquestionnaire'/>
                </NavigationButton>
              ) :
              (
                <NavigationButton isNext
                                  onClick={props.handleNextCompetency}>
                  <H5PTranslatedText text='nextcompetencypage'/>
                </NavigationButton>
              )
          }
        </Box>

      </Box>
    </Box>
  </Box>);
}

CompetencyPage.propTypes = Object.assign(
  {
    currentCompetencyIndex: PropTypes.number,
    questionComponent: PropTypes.elementType,
    handleEnableQuestion: PropTypes.func,
    handleSelectAnswer: PropTypes.func,
    handlePreviousCompetency: PropTypes.func,
    handleNextCompetency: PropTypes.func,
    handleFinishAndSubmit: PropTypes.func,
  },
  questionsByCompetencyAndSubCompetencies,
  progressData
);

CompetencyPage.defaultProps = Object.assign(
  {
    currentCompetencyIndex: 0,
    questionComponent: Question,
    handleEnableQuestion: (qid) => null,
    handleSelectAnswer: (quid, val) => null,
    handlePreviousCompetency: (allcomps) => null,
    handleNextCompetency: (allcomps) => null,
    handleFinishAndSubmit: () => null,
  },
  questionnaireCompetenciesQuestionsDefault,
  progressDataDefault
);

export default CompetencyPage;
