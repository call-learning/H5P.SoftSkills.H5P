import {
  Box,
  Grid,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { getCompetencyImageFromIndex } from '../../utils/ComponentsUtils';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';

import { ArrowForward } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import ResultRadarChart from '../elements/ResultRadarChart';
import PropTypes from 'prop-types';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault, questionnaireResults, questionnaireResultsDefault
} from '../../utils/CommonProptypes';
import H5PTranslatedText from '../../utils/H5PTranslatedText';

const styles = theme => ({
  cardLike: {
    boxShadow: '0 7px 17px 0 rgba(0, 0, 0, 0.2)'
  },
  cardLayout: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  }
});

const CompetencyResultsPage = withStyles(styles)((props) => {
    const { classes } = props;
    const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
    return (
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="90%">

          <Box alignSelf="flex-start">{props.topNavigation}</Box>
          <Box><img className="SuccessImage" src={getCompetencyImageFromIndex(props.competencyIndex)} alt=""
                    role="presentation"/></Box>

          <Typography variant="h3">{currentCompetency.label}</Typography>
          <ResultRadarChart results={props.results[props.competencyIndex].subCompetenciesResults} hasLabels
                            graphSize={100}/>
          <Grid container>
            <Grid container spacing={1} className={classes.cardLayout} alignContent="center" alignItems="center">
              <Grid item xs={6}><Typography variant="h4"><H5PTranslatedText
                text='detailpercompetency'/></Typography></Grid>
              <Grid item xs={2}><Typography><H5PTranslatedText text='participation'/></Typography></Grid>
              <Grid item xs={2}><Typography><H5PTranslatedText text='result'/></Typography></Grid>
              <Grid item xs={2}>&nbsp;</Grid>
            </Grid>
            {
              (props.results &&
                props.results[props.competencyIndex] &&
                props.results[props.competencyIndex].subCompetenciesResults) ?
                props.results[props.competencyIndex].subCompetenciesResults.map((subC, subCompIndex) => (
                  <Grid container spacing={1} alignContent="center" alignItems="center"
                        className={`${classes.cardLike} ${classes.cardLayout}`} key={'resultcontainer' + subCompIndex}>
                    <Grid item xs={6}><Typography>{subC.label}</Typography></Grid>
                    <Grid item xs={2}>
                      <Typography>
                        <H5PTranslatedText text='over' arguments={
                          { 'val1': subC.totalAnswered, 'val2': subC.totalQuestions }
                        }/>
                      </Typography></Grid>
                    <Grid item xs={2}><Typography>{Math.floor(subC.value)}%</Typography></Grid>
                    <Grid item xs={2}><Typography align="right">
                      <Fab color="primary" onClick={(e) => props.handleViewSubCompetencyClick(props.competencyIndex, subCompIndex)}>
                        <ArrowForward/>
                      </Fab>
                    </Typography>
                    </Grid>
                  </Grid>
                )) : ''
            }
          </Grid>

        </Box>
      </Container>
    );
  }
);

CompetencyResultsPage.propTypes = Object.assign(
  {
    competencyIndex: PropTypes.number,
    handleViewSubCompetencyClick: PropTypes.func,
    topNavigation: PropTypes.element
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireResults
);

CompetencyResultsPage.defaultProps = Object.assign(
  {
    competencyIndex: 0,
    handleViewSubCompetencyClick: PropTypes.func,
    topNavigation: (<div/>)
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResultsDefault
);

export default withStyles(styles)(CompetencyResultsPage);
