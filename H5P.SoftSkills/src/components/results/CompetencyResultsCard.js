import {
  Box
} from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import HorizontalCardWithAction from '../elements/HorizontalCardWithAction';
import ResultRadarChart from '../elements/ResultRadarChart';
import PropTypes from 'prop-types';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault, questionnaireResults, questionnaireResultsDefault
} from '../../utils/CommonProptypes';
import H5PTranslatedText from '../../utils/H5PTranslatedText';

const styles = theme => ({
  'smallProgress': {
    height: '1em',
    margin: '0.5em'
  },
  'otherSmallProgress': {
    backgroundColor: theme.palette.grey['300'],
  },
  'currentSmallProgress': {
    backgroundColor: theme.palette.primary.main
  },
  'cardLike': {
    boxShadow: '0 7px 17px 0 rgba(0, 0, 0, 0.2)'
  }
});

const CompetencyResultsCard = withStyles(styles)((props) => {
  const { classes } = props;
  const competency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
  const components = [
    <Box display="flex" key="description">
      <Box minWidth={250} alignItems="center" key="leftpart">
        {
          props.questionsByCompetencyAndSubCompetencies.map(
            (comp, compIndex) => <Box key={compIndex}
                                      className={`${classes.smallProgress} ${compIndex === props.competencyIndex ?
                                        classes.currentSmallProgress : classes.otherSmallProgress}`}
                                      width={props.questionsByCompetencyAndSubCompetencies[compIndex].value}/>
          )
        }
      </Box>,
      <Box flexGrow={1}>
        <Typography variant="h5">{competency.label}</Typography>
        <Typography>
          <H5PTranslatedText text='competencyresultdesc' arguments={
            {
              compcount: competency.subCompetencies.length,
              compPercent: Math.floor(props.results.competenciesResults[props.competencyIndex].value)
            }}/>
        </Typography>
      </Box>
    </Box>,
    <ResultRadarChart key="graph"
                      resultsList={props.results.competenciesResults[props.competencyIndex].subCompetenciesResults}/>
  ];
  return (
    <HorizontalCardWithAction components={components} handleActionClick={props.handleActionClick}/>
  );
});

CompetencyResultsCard.propTypes = Object.assign(
  {
    competencyIndex: PropTypes.number,
    handleActionClick: PropTypes.func
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireResults,
);

CompetencyResultsCard.defaultProps = Object.assign(
  {
    competencyIndex: 0,
    handleActionClick: (e) => null
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResultsDefault
);

export default CompetencyResultsCard;
