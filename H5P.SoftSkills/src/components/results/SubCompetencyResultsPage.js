import React  from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {
  Box,
  Typography
} from '@material-ui/core';
import {
  computeProgressPerCompetency,
  getCompetencyImageFromIndex, getCurrentQuantile
} from '../../utils/ComponentsUtils';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResourcesDefault,
  questionnaireAnsweredQuestions,
  questionnaireAnsweredQuestionsDefault, questionnaireSettings, questionnaireSettingsDefault
} from '../../utils/CommonProptypes';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import ResultBarChart from '../elements/ResultBarChart';
import SubCompetencyResultsList from './SubCompetencyResultsList';


function SubCompetencyResultsPage (props) {
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
  const currentSubCompetency = currentCompetency.subCompetencies[props.subCompetencyIndex];
  const globalResults = computeProgressPerCompetency(
    props.questionsByCompetencyAndSubCompetencies,
    props.answeredQuestions,
    props.settings
  );
  const currentCompetencyResult = globalResults.competenciesResults
    && globalResults.competenciesResults[props.competencyIndex];
  const currentSubCompetencyResult =
    currentCompetencyResult.subCompetenciesResults
    && currentCompetencyResult.subCompetenciesResults[props.subCompetencyIndex];
  const currentQuantileValue = getCurrentQuantile(currentSubCompetencyResult.value);

  return (
    <Container  maxWidth={'md'} >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pt={2}>
        <Box alignSelf="flex-start">{props.topNavigation}</Box>
        <Box my={2}><img className="SuccessImage" src={getCompetencyImageFromIndex(props.competencyIndex)} alt=""
                         role="presentation"/></Box>

        <Box>
          <Typography color="textSecondary">
            {<span dangerouslySetInnerHTML={{__html:currentCompetency.label}}/>}
          </Typography></Box>
        <Box>
          <Typography variant="h4">
            {<span dangerouslySetInnerHTML={{__html:currentSubCompetency.label}}/>}
        </Typography></Box>
        <Box width={{xs:"99%", sm:"50%"}}><ResultBarChart hasCompetencyLabel={false}
                                           resultsList={[currentSubCompetencyResult]} graphHeight={130}/></Box>
        <Container>
          <Box my={1}>
            <Typography variant="subtitle2"><H5PTranslatedText text='yourcompetencyresults'/></Typography>
          </Box>
          <Typography color="secondary"><H5PTranslatedText text={'resultFeedBack' + currentQuantileValue}
                                         arguments={{
                                           compPercent: currentSubCompetencyResult.value
                                         }}/></Typography>
          <Box my={2}>
            <Typography variant="subtitle2"><H5PTranslatedText text='resources'/></Typography>
            <SubCompetencyResultsList {...props}/>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

SubCompetencyResultsPage.propTypes = {
  competencyIndex: PropTypes.number,
  subCompetencyIndex: PropTypes.number,
  topNavigation: PropTypes.element,
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireSettings,
  ...questionnaireAnsweredQuestions
};

SubCompetencyResultsPage.defaultProps = {
  competencyIndex: 0,
  subCompetencyIndex: 0,
  topNavigation: (<div/>),
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireSettingsDefault,
  ...questionnaireAnsweredQuestionsDefault
};

export default SubCompetencyResultsPage;
