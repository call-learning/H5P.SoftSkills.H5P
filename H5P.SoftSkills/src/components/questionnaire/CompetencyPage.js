import React from 'react';
import { Grid } from '@material-ui/core';
import {
  getTotalQuestionCountCompetency
} from '../../utils/ComponentsUtils';
import QuestionnaireSideNavigation from './QuestionnaireSideNavigation';
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
  // Get Question count first (for all categories)
  const totalQuestionCount = getTotalQuestionCount(props.questionsByCompetencyAndSubCompetencies);
  const competencyIndex = props.currentCompetencyIndex;

  // Competency information.
  const totalQuestionForCompetency = getTotalQuestionCountCompetency(props.questionsByCompetencyAndSubCompetencies[competencyIndex]);
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[competencyIndex];

  return (<Box display="flex" flexDirection="row" maxHeight={"100vh"}>
    <Box mx={1} flex={1}>
      <QuestionnaireSideNavigation
        answeredQuestionCount={props.progressData.totalAnsweredQuestions}
        totalQuestion={totalQuestionCount}
        competencyTitle={currentCompetency.label}
        totalQuestionForCompetency={totalQuestionForCompetency}
        subCompetencyProgressData={props.progressData.competenciesProgress[competencyIndex]}
      />
    </Box>
    <Box flex={4} mx={1} overflow={"auto"} id={"competencyPageContainer"}>
      <QuestionsList
        questionComponent={props.questionComponent}
        questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
        competencyIndex={competencyIndex}
        handleEnableQuestion={props.handleEnableQuestion}
        handleSelectAnswer={props.handleSelectAnswer}
      />
      <Box display="flex"
           alignItems="flex-start"
           width="100%">
        <Box alignSelf="flex-start" mr="auto">
          {
            competencyIndex > 0 ?
              (<NavigationButton isBack
                       onClick={props.handlePreviousCompetency}><H5PTranslatedText text='previouscompetencypage'/>
              </NavigationButton>) : ''
          }
        </Box>
        <Box alignSelf="flex-end" >
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
    subCompetencyProgressInCompetency: [],
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
