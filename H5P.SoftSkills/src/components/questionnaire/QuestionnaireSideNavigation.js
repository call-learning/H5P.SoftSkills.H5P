import React from 'react';
import { Container, Box, LinearProgress } from '@material-ui/core';
import VerticalProgressWithSteps from '../elements/VerticalProgressWithSteps';
import PropTypes from 'prop-types';
import t from '../../utils/TranlationManager';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import Typography from '@material-ui/core/Typography';
import { getCompetencyImageFromIndex } from '../../utils/ComponentsUtils';
import { progressData, progressDataDefault } from '../../utils/CommonProptypes';

const DEFAULT_STRING_NUMBERING = ['firstpart',
  'secondpart',
  'thirdpart',
  'fourthpart',
  'sixthpart',
  'seventhpart',
  'eigth',
  'ninth'];

export default function QuestionnaireSideNavigation (props) {
  return (
    <Box display="flex" height="100%" position="fixed">
      <Box display="flex" flexDirection="column">
        <Box alignItems="flex-start" flexGrow={1}>
          <Box display="flex" pt="15%" justifyContent="center">
            <Box>
              <img className="IllustrationImage" src={getCompetencyImageFromIndex(props.competencyIndex)}
                   alt={props.competencyTitle}
                   role="presentation"/>
              <div>{t.translate(DEFAULT_STRING_NUMBERING[props.competencyIndex % DEFAULT_STRING_NUMBERING.length])}</div>
              <div>{props.competencyTitle}</div>
            </Box>
          </Box>
        </Box>
        <Box alignItems="flex-end" pb="20%">
          <Box>
            <Box display="flex" justifyContent="center">
              <Typography>
                <H5PTranslatedText text='over' arguments={
                  { 'val1': props.answeredQuestionCount, 'val2': props.totalQuestion }
                }/>
              </Typography>
            </Box>
            <Container>
              <LinearProgress variant="determinate" value={100 * props.answeredQuestionCount / props.totalQuestion}/>
            </Container>
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
