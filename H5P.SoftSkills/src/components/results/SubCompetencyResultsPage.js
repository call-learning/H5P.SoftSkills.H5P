import {
  Box, Button,
  Grid,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import t from '../../utils/TranlationManager';
import {
  getCompetencyImageFromIndex,
  resourcesPerContext
} from '../../utils/ComponentsUtils';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResources,
  questionnaireResourcesDefault,
  questionnaireResults,
  questionnaireResultsDefault
} from '../../utils/CommonProptypes';
import ResourcesList from './ResourcesList';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import BottomRectangle from '../elements/BottomRectangle';

const styles = theme => ({
  cardLike: {
    boxShadow: '0 7px 17px 0 rgba(0, 0, 0, 0.2)'
  },
  cardLayout: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  }
});
const QUANTILES = [0, 25, 50, 75, 100];

function SubCompetencyResultsPage (props) {
  const { classes } = props;
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
  const currentSubCompetency = currentCompetency.subCompetencies[props.subCompetencyIndex];
  const currentSubCompetencyResult =
    props.results[props.competencyIndex] && props.results[props.competencyIndex].subCompetenciesResults &&
    props.results[props.competencyIndex].subCompetenciesResults[props.subCompetencyIndex];
  const currentQuantileValue = QUANTILES.reduce((quantileVal, quantileValue, index) =>
      (currentSubCompetencyResult.value > quantileValue ? quantileValue : quantileVal),
    0
  );
  const targetedResources =
    resourcesPerContext(props.resources, props.questionsByCompetencyAndSubCompetencies, props.competencyIndex, props.subCompetencyIndex);

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="90%">
        <Box alignSelf="flex-start">{props.topNavigation}</Box>
        <Box my={2}><img className="SuccessImage" src={getCompetencyImageFromIndex(props.competencyIndex)} alt=""
                  role="presentation"/></Box>

        <Typography variant="h6">{currentCompetency.label}</Typography>
        <Typography variant="h4">{currentSubCompetency.label}</Typography>

        <Box my={2}>
          <Box>
            <Typography variant="h4"><H5PTranslatedText text='yourcompetencyresults'/></Typography>
            <BottomRectangle/>
          </Box>
          <Typography><H5PTranslatedText text={'resultFeedBack'+currentQuantileValue}
                                         arguments={{
                                           compPercent: currentSubCompetency.value
                                         }}/></Typography>
          <Box my={2}>
            <Typography variant="h4"><H5PTranslatedText text='resources'/></Typography>
            <BottomRectangle/>
          <ResourcesList resourcesByContext={targetedResources}/>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

SubCompetencyResultsPage.propTypes = Object.assign(
  {
    competencyIndex: PropTypes.number,
    subCompetencyIndex: PropTypes.number,
    topNavigation: PropTypes.element
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireResults,
  questionnaireResources
);

SubCompetencyResultsPage.defaultProps = Object.assign(
  {
    competencyIndex: 0,
    subCompetencyIndex: 0,
    topNavigation: (<div/>)
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResultsDefault,
  questionnaireResourcesDefault
);

export default withStyles(styles)(SubCompetencyResultsPage);
