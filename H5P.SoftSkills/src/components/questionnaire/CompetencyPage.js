import React from 'react';
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

import QuestionsList from './QuestionsList';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';

function CompetencyPage (props) {
  const competencyIndex = props.currentCompetencyIndex;
  const competencyProgressData = props.progressData
    .competenciesProgress.map((cdata) => (100 * cdata.answeredQuestionsCount / cdata.questionsCount));

  // Competency information.
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[competencyIndex];
  const currentCompetencyProgress = props.progressData.competenciesProgress[competencyIndex];

  return (<Box display="flex" flexDirection="row" height={'100%'}>
    <Box mx={1} flex={1}>
      <CompetencySideNavigation
        answeredQuestionsCount={currentCompetencyProgress.answeredQuestionsCount}
        questionsCount={currentCompetencyProgress.questionsCount}
        competencyTitle={currentCompetency.label}
        competencyPartLabel={currentCompetency.partname}
        competencyImage={currentCompetency.image?currentCompetency.image:null}
        competencyProgressData={competencyProgressData}
        competencyIndex={props.currentCompetencyIndex}
      />
    </Box>
    <Box flex={4} mx={1} px={1} overflow={'auto'} height={'100%'} id={'competencyPageContainer'}>
      <QuestionsList
        questionComponent={props.questionComponent}
        questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
        competencyIndex={competencyIndex}
        handleEnableQuestion={props.handleEnableQuestion}
        handleSelectAnswer={props.handleSelectAnswer}
      />
      <Box display="flex"
           width="100%"
           justifyContent={'space-between'}
           flexDirection={{ xs: 'column', sm: 'row' }}
           pb={3}
      >
        <Box alignSelf={'flex-start'} my={1}>
          {
            competencyIndex > 0 ?
              (<NavigationButton isBack
                                 onClick={props.handlePreviousCompetency}><H5PTranslatedText
                text="previouscompetencypage"/>
              </NavigationButton>) : ''
          }
        </Box>
        <Box alignSelf={{ xs: 'flex-start', sm: 'flex-end' }} my={1}>
          {
            competencyIndex >= (props.questionsByCompetencyAndSubCompetencies.length - 1) ?
              (
                <NavigationButton isNext
                                  onClick={props.handleFinishAndSubmit}>
                  <H5PTranslatedText text="finishquestionnaire"/>
                </NavigationButton>
              ) :
              (
                <NavigationButton isNext
                                  onClick={props.handleNextCompetency}>
                  <H5PTranslatedText text="nextcompetencypage"/>
                </NavigationButton>
              )
          }
        </Box>

      </Box>
    </Box>
  </Box>);
}

CompetencyPage.propTypes = {
  currentCompetencyIndex: PropTypes.number,
  questionComponent: PropTypes.elementType,
  handleEnableQuestion: PropTypes.func,
  handleSelectAnswer: PropTypes.func,
  handlePreviousCompetency: PropTypes.func,
  handleNextCompetency: PropTypes.func,
  handleFinishAndSubmit: PropTypes.func,
  ...questionsByCompetencyAndSubCompetencies,
  ...progressData
};

CompetencyPage.defaultProps = {
  currentCompetencyIndex: 0,
  questionComponent: Question,
  handleEnableQuestion: () => null,
  handleSelectAnswer: () => null,
  handlePreviousCompetency: () => null,
  handleNextCompetency: () => null,
  handleFinishAndSubmit: () => null,
  ...questionnaireCompetenciesQuestionsDefault,
  ...progressDataDefault
};

export default CompetencyPage;
