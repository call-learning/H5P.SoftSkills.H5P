import React, { useContext } from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import VerticalProgressWithSteps from '../elements/VerticalProgressWithSteps';
import PropTypes from 'prop-types';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import Typography from '@material-ui/core/Typography';
import { getCompetencyImageFromIndex } from '../../utils/ComponentsUtils';
import { makeStyles } from '@material-ui/core/styles';
import { H5PContext } from '../../contexts/H5PContext';

const DEFAULT_STRING_NUMBERING = ['firstpart',
  'secondpart',
  'thirdpart',
  'fourthpart',
  'sixthpart',
  'seventhpart',
  'eigthpart',
  'ninthpart'];

const useStyles = makeStyles(theme => ({
  partNumber: {
    fontSize: 'smaller',
    textTransform: 'lowercase',
  },
  progressBarLegend: {
    fontSize: 'smaller',
  }
}));

const progressUseStyles = makeStyles(theme => ({
  root: {
    height: (props) => (props.thickness),
    borderRadius: (props) => (props.thickness / 2),
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },

}));

const CompetencyProgress = (props) => {
  const classes = progressUseStyles(props);
  return <LinearProgress className={classes.root} variant="determinate" value={props.value}/>;
};

const CompetencySideNavigation = (props) => {
  const classes = useStyles(props);
  const h5pContext = useContext(H5PContext);
  return (
    <Box display="flex" flexDirection="row" height="100%" position="absolute" top={0}>
      <Box display="flex" flexDirection="column" alignItems="center" px={{ xs: 0, sm: 3 }}>
        <Box display={{ xs: 'none', sm: 'flex' }} pt="15%" justifyContent="center">
          <Box>
            <img className="IllustrationImage"
                 src={getCompetencyImageFromIndex(props.competencyIndex, props.competencyImage, h5pContext.contentId)}
                 alt={props.competencyTitle}
                 role="presentation"/>
            <Typography className={classes.partNumber} color="textSecondary">
              <H5PTranslatedText
                text={DEFAULT_STRING_NUMBERING[props.competencyIndex % DEFAULT_STRING_NUMBERING.length]}/>
            </Typography>
            <Typography>{props.competencyTitle}</Typography>
          </Box>
        </Box>
        <Box display={{ xs: 'none', sm: 'flex' }} mb={2} mt="auto">
          <Box>
            <Typography className={classes.progressBarLegend} color="textSecondary">
              <H5PTranslatedText text="overcompleted" arguments={
                { 'val1': props.answeredQuestionsCount, 'val2': props.questionsCount }
              }/>
            </Typography>
          </Box>
          <Box>
            <CompetencyProgress thickness={10} value={100 * props.answeredQuestionsCount / props.questionsCount}/>
          </Box>
        </Box>
      </Box>
      <Box><VerticalProgressWithSteps progressInfo={props.competencyProgressData}/></Box>
    </Box>);
};

CompetencySideNavigation.propTypes = {
  answeredQuestionsCount: PropTypes.number,
  questionsCount: PropTypes.number,
  competencyTitle: PropTypes.string,
  competencyImage: PropTypes.shape(
    {
      path: PropTypes.string,
      copyright: PropTypes.string,
      mime: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    }
  ),
  competencyIndex: PropTypes.number,
  competencyProgressData: PropTypes.arrayOf(PropTypes.number)
};

CompetencySideNavigation.defaultProps = {
  answeredQuestionsCount: 0,
  questionsCount: 1,
  competencyTitle: '',
  competencyIndex: 0,
  competencyImage: undefined,
  competencyProgressData: []
};

export default CompetencySideNavigation;
