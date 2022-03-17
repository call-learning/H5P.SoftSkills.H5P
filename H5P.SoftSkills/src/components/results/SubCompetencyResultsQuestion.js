import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  questionAnswerData,
  questionnaireSettings
} from '../../utils/CommonProptypes';
import {
  getTextValueFromPossibleValue,
  isAcquiredAnswer
} from '../../utils/ComponentsUtils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  acquiredStyle: {
    backgroundColor: theme.palette.success.main
  },
  inAcquisitionStyle: {
    backgroundColor: theme.palette.warning.main
  },
  dotBackground: {
    backgroundColor: theme.palette.grey[200],
  },
  dot: {
    height: '1em',
    width: '1em',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft:"0.25em",
    marginRight:"0.25em",
    verticalAlign: "middle"
  }
}));

const SubCompetencyResultsQuestion = (props) => {
  const classes = useStyles(props);
  const qindex = props.questionIndex;
  const q = props.questionData;
  const possibleAnswerArray = Array.from(props.settings.possibleAnswers);
  possibleAnswerArray.pop(); // Remove last element.
  const firstAnswer = possibleAnswerArray[possibleAnswerArray.length-1];
  const lastAnswer = possibleAnswerArray[0];
  const firstAnswerText = getTextValueFromPossibleValue(
    props.settings,
    q.questionData,
    firstAnswer.id);
  const lastAnswerText = getTextValueFromPossibleValue(
    props.settings,
    q.questionData,
    lastAnswer.id);
  return (
    <Box key={qindex} display="flex" py={2}
         flexDirection={{ xs: 'column', sm: 'row' }}
         alignItems={{ xs: 'center', sm: 'initial' }}
    >
      <Box mx={4} maxWidth="80%" flexGrow={1}>
        <Typography variant="body2">{q.questionData.label}</Typography>
      </Box>
      {
        !q.answer ? '' :
          (<Box display="flex" flexDirection="row" alignSelf={'right'} minWidth="15em">
            <Typography>{firstAnswerText}</Typography>
            <span>
              {
                possibleAnswerArray.map((answerInfo) => {
                  let cl = classes.dot;
                  if (answerInfo.id === q.answer) {
                    cl = cl + ' ' + (isAcquiredAnswer(props.settings, q.questionData, q.answer) ?
                      classes.acquiredStyle : classes.inAcquisitionStyle);
                  } else {
                    cl = cl + ' ' + classes.dotBackground;
                  }
                  return (<span className={cl} key={'dotAnswer'+qindex+answerInfo.id}></span>)
                })
              }
            </span>
            <Typography>{lastAnswerText}</Typography>
          </Box>)
      }
    </Box>
  );
};

SubCompetencyResultsQuestion.propTypes = {
  questionData: questionAnswerData,
  questionIndex: PropTypes.number,
  ...questionnaireSettings,
};

SubCompetencyResultsQuestion.defaultProps = {
  questionData: {},
  qindex: 0,
  ...questionnaireSettings,
};

export default SubCompetencyResultsQuestion;
