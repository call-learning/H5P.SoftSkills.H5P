import {
  Box,
  LinearProgress,
} from '@material-ui/core';
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


const styles = theme => ({

});

const QuestionnaireResultsPage = withStyles(styles)((props) => {
  const { classes } = props;
  const quantileResult = getCurrentQuantile(props.results.value);
  return (
    <Container>
    <Box alignContent="center" display="flex" flexDirection="column">
      <Box py={3}>
        <Typography align="center" variant="h4"><H5PTranslatedText text='results'/></Typography>
      </Box>
      <Box py={3}>
        <Typography align="center"  color="secondary"><H5PTranslatedText text={`globalResultFeedBack${quantileResult}`} /></Typography>
      </Box>
      <Box>
        <Typography align="center" variant="h4"><H5PTranslatedText text='resultScoreLabel'/></Typography>
      </Box>
      <Container maxWidth="sm" fixed >
        <ResultBarChart resultsList={props.results.competenciesResults} graphHeight={250} />
      </Container>
      <Box>
        <Typography align="center"  variant="h4"><H5PTranslatedText text='resultspercompetency'/></Typography>
      </Box>
      {
        props.questionsByCompetencyAndSubCompetencies.map((comp, compIndex) => (
          <Box key={compIndex} >
            <CompetencyResultsCard
              questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
              results={props.results}
              competencyIndex={compIndex}
              handleActionClick={(e) => {props.handleViewCompetencyClick(compIndex);}}
            />
          </Box>))
      }
      <Box mx="auto">
        <NavigationButton onClick={props.handleReviewQuestionnaire}
                          isBack={false}
                          isNext={false}>
          <H5PTranslatedText text='reviewquestionnaire'/>
        </NavigationButton>
      </Box>
    </Box>
    </Container>
  );
});

QuestionnaireResultsPage.propTypes = Object.assign(
  {
    handleViewCompetencyClick: PropTypes.func,
    handleReviewQuestionnaire: PropTypes.func
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireResults
);

QuestionnaireResultsPage.defaultProps = Object.assign(
  {
    handleViewCompetencyClick: (cid) => null,
    handleReviewQuestionnaire: (cid) => null
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResultsDefault
);

export default QuestionnaireResultsPage;
