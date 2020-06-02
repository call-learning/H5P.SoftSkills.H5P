import {
  Box,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import React, { Fragment } from 'react';
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
import Paper from '@material-ui/core/Paper';
import NavigationButton from '../elements/NavigationButton';

const CompetencyLinearProgress = withStyles({
  root: {
    height: '2em',
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#ddd'
  },
})(LinearProgress);

const styles = theme => ({

});

const QuestionnaireResultsPage = withStyles(styles)((props) => {
  const { classes } = props;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="80%">
      <Box py="2em">
        <Typography variant="h3"><H5PTranslatedText text='results'/></Typography>
      </Box>
      <Box width="50%">
          {
            props.questionsByCompetencyAndSubCompetencies.map((competency, competencyIndex) => (
              <Box display="flex" flexDirection="row">
                  <Box flexGrow={1} px={1} py={1}><Typography align="right">{competency.label}</Typography></Box>
                  <Box minWidth="40%" py={1}>
                    <CompetencyLinearProgress variant="determinate"
                                            value={props.results[competencyIndex].value}/>
                  </Box>
              </Box>
            ))
          }
      </Box>
      <Box>
        <Typography variant="h3"><H5PTranslatedText text='resultspercompetency'/></Typography>
      </Box>
      {
        props.questionsByCompetencyAndSubCompetencies.map((comp, compIndex) => (
          <Box key={compIndex} maxWidth="80%">
            <CompetencyResultsCard
              questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
              results={props.results}
              competencyIndex={compIndex}
              handleActionClick={(e) => {props.handleViewCompetencyClick(compIndex);}}
            />
          </Box>))
      }
      <Box>
        <NavigationButton onClick={props.handleReviewQuestionnaire}
                          isBack={false}
                          isNext={false}>
          <H5PTranslatedText text='reviewquestionnaire'/>
        </NavigationButton>
      </Box>
    </Box>
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
