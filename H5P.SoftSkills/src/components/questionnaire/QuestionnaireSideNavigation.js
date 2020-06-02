import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import VerticalProgressWithSteps from '../elements/VerticalProgressWithSteps';
import PropTypes from 'prop-types';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import Typography from '@material-ui/core/Typography';
import { getCompetencyImageFromIndex } from '../../utils/ComponentsUtils';

const DEFAULT_STRING_NUMBERING = ['firstpart',
  'secondpart',
  'thirdpart',
  'fourthpart',
  'sixthpart',
  'seventhpart',
  'eigthpart',
  'ninthpart'];

export default function QuestionnaireSideNavigation (props) {
  return (
    <Box display="flex" flexDirection="row" height="100%" position="sticky" top={0}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Box display="flex" pt="15%" justifyContent="center">
            <Box>
              <img className="IllustrationImage" src={getCompetencyImageFromIndex(props.competencyIndex)}
                   alt={props.competencyTitle}
                   role="presentation"/>
              <div><H5PTranslatedText text={DEFAULT_STRING_NUMBERING[props.competencyIndex % DEFAULT_STRING_NUMBERING.length]}/></div>
              <div>{props.competencyTitle}</div>
            </Box>
          </Box>
        </Box>
        <Box mb={2} mt="auto">
            <Box>
              <Typography>
                <H5PTranslatedText text='over' arguments={
                  { 'val1': props.answeredQuestionCount, 'val2': props.totalQuestion }
                }/>
              </Typography>
            </Box>
            <Box>
              <LinearProgress variant="determinate" value={100 * props.answeredQuestionCount / props.totalQuestion}/>
            </Box>
        </Box>
      </Box>
      <Box><VerticalProgressWithSteps progressInfo={props.subCompetencyProgressData}/></Box>
    </Box>);
}

QuestionnaireSideNavigation.propTypes = {
  answeredQuestionCount: PropTypes.number,
  totalQuestion: PropTypes.number,
  competencyTitle: PropTypes.string,
  competencyIndex: PropTypes.number,
  subCompetencyProgressData: PropTypes.arrayOf(PropTypes.number)
};

QuestionnaireSideNavigation.defaultProps = {
  answeredQuestionCount: 0,
  totalQuestion: 1,
  competencyTitle: '',
  competencyIndex: 0,
  subCompetencyProgressData: []
};
