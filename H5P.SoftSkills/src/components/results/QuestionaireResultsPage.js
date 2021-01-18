import { Box } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CompetencyResultsCard from './CompetencyResultsCard';
import PropTypes from 'prop-types';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResults, questionnaireResultsDefault
} from '../../utils/CommonProptypes';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';
import { getCurrentQuantile } from '../../utils/ComponentsUtils';
import ResultBarChart from '../elements/ResultBarChart';
import ObtainBadgeDialog from '../pages/ObtainBadgeDialog';

const QuestionnaireResultsPage = (props) => {
  const quantileResult = getCurrentQuantile(props.results.value);
  return (
    <Container maxWidth={'md'}>
      <Box alignContent="center" display="flex" flexDirection="column" pt={2}>
        <Box pt={1}>
          <Typography align="center" variant="h4"><H5PTranslatedText text='results'/></Typography>
        </Box>
        <Box py={3}>
          <Typography align="center" color="secondary"><H5PTranslatedText
            text={`globalResultFeedBack${quantileResult}`}/></Typography>
        </Box>
        <Box display={{ xs: 'none', sm: 'block' }}>
          <Typography align="center" variant="h4"><H5PTranslatedText text='resultScoreLabel'/></Typography>
        </Box>
        <Box maxWidth="md" display={{ xs: 'none', sm: 'block' }}>
          <ResultBarChart resultsList={props.results.competenciesResults} graphHeight={250}/>
        </Box>
        <Box>
          <Typography align="center" variant="h4"><H5PTranslatedText text='resultspercompetency'/></Typography>
        </Box>
        {
          props.questionsByCompetencyAndSubCompetencies.map((comp, compIndex) => (
            <Box key={compIndex}>
              <CompetencyResultsCard
                questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
                results={props.results}
                competencyIndex={compIndex}
                handleActionClick={(e) => {props.handleViewCompetencyClick(compIndex);}}
              />
            </Box>))
        }
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box mx={2}>
            <NavigationButton onClick={props.handleReviewQuestionnaire}
                              isBack={false}
                              isNext={false}>
              <H5PTranslatedText text='reviewquestionnaire'/>
            </NavigationButton>
          </Box>
          <Box mx={2}>
            <NavigationButton onClick={props.handleRestartQuestionnaire}
                              isBack={false}
                              isNext={false}>
              <H5PTranslatedText text='restartquestionnaire'/>
            </NavigationButton>
          </Box>
          {
            props.canObtainBadge?(<ObtainBadgeDialog score={props.results.value}/>) : ''
          }

        </Box>
      </Box>
    </Container>
  );
};

QuestionnaireResultsPage.propTypes = Object.assign(
  {
    handleViewCompetencyClick: PropTypes.func,
    handleReviewQuestionnaire: PropTypes.func,
    handleRestartQuestionnaire: PropTypes.func,
    handleObtainBadge: PropTypes.func,
    canObtainBadge: PropTypes.bool,
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireResults
);

QuestionnaireResultsPage.defaultProps = Object.assign(
  {
    handleViewCompetencyClick: () => null,
    handleReviewQuestionnaire: () => null,
    handleRestartQuestionnaire: () => null,
    handleObtainBadge: ()=> null,
    canObtainBadge: false,
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResultsDefault
);

export default QuestionnaireResultsPage;
