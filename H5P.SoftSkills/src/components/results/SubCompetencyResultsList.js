import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Resource from './Resource';
import {
  questionnaireAnsweredQuestions,
  questionnaireAnsweredQuestionsDefault,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResources,
  questionnaireResourcesDefault, questionnaireSettings, questionnaireSettingsDefault,
  questionsByCompetencyAndSubCompetencies
} from '../../utils/CommonProptypes';
import Box from '@material-ui/core/Box';
import {
  getSubCompetencyResultsAndResources,
  getTextValueFromPossibleValue,
  isAcquiredAnswer
} from '../../utils/ComponentsUtils';
import { CallMade, Check, ExpandMore } from '@material-ui/icons';

import Fab from '@material-ui/core/Fab';
import H5PTranslatedText from '../../utils/H5PTranslatedText';

const styles = theme => ({
  root: {
    width: '100%',
  },
  acquiredStyle: {
    color: theme.palette.success.main
  },
  inAcquisitionStyle: {
    color: theme.palette.warning.main
  }
});

const SubCompetencyResultsList = withStyles(styles)((props) => {
    const { classes } = props;
    const [expanded, setExpanded] = React.useState('');

    const resultsAndResources = getSubCompetencyResultsAndResources(
      props.questionsByCompetencyAndSubCompetencies,
      props.answeredQuestions,
      props.resources,
      props.settings,
      props.competencyIndex,
      props.subCompetencyIndex);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const toImproveInfo = (<Typography><CallMade className={classes.inAcquisitionStyle}/><H5PTranslatedText
      text='toImprove'/></Typography>);
    const masteredInfo = (
      <Typography><Check className={classes.acquiredStyle}/><H5PTranslatedText text='mastered'/></Typography>);
    return (
      <Container disableGutters={true}>
        {
          resultsAndResources.map((context, cindex) => {
            const panelName = `context-${cindex}`;
            return (
              <ExpansionPanel key={cindex} expanded={expanded === panelName} onChange={handleChange(panelName)}>
                <ExpansionPanelSummary
                  expandIcon={<Fab color="primary"><ExpandMore/></Fab>}
                  aria-controls={`${panelName}-content`}
                  id={`${panelName}-header`}
                >
                  <Box display="flex" alignItems="center" flexGrow={1}>
                    <Box px={2} flexGrow={1}>
                      <Typography variant="body2">{`${cindex + 1}. ${context.label}`}</Typography>
                    </Box>
                    <Box display="flex">
                      {
                        context.rawValue > context.contextAcquisitionThreshold ? masteredInfo : toImproveInfo
                      }
                    </Box>
                  </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Container>
                    <Container py={1}>
                      {
                        context.questionsAnswers.map((q, qindex) =>
                          (<Box key={qindex} display="flex" py={2}
                                flexDirection={{ xs: 'column', sm: 'row' }}
                                alignItems={{ xs: 'center', sm: 'initial' }}
                          >
                            <Box mx={4} maxWidth="80%" flexGrow={1}>
                              <Typography variant="body2">{q.questionData.label}</Typography>
                            </Box>
                            {
                              !q.answer ? '' :
                                (<Box display="flex" flexDirection="column" alignSelf={'right'} minWidth="20%">
                                  <Typography display="inline"><H5PTranslatedText text='yourAnswer'/>:</Typography>
                                  <Typography display="inline"
                                              className={isAcquiredAnswer(props.settings,
                                                q.questionData,
                                                q.answer) ? classes.acquiredStyle : classes.inAcquisitionStyle}>
                                    {getTextValueFromPossibleValue(props.settings, q.questionData, q.answer)}
                                  </Typography>
                                </Box>)
                            }
                          </Box>)
                        )
                      }
                    </Container>

                    <Container>
                      <Container>
                        <Typography variant="h4"><H5PTranslatedText text='ourAdvice'/></Typography>
                      </Container>
                      <Container maxWidth={"100%"}>
                        {
                          context.resources.map((resource) => <Resource key={resource.id} resource={resource}/>)
                        }
                      </Container>
                    </Container>
                  </Container>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </Container>
    );
  }
);

SubCompetencyResultsList.propTypes = Object.assign(
  {
    competencyIndex: PropTypes.number,
    subCompetencyIndex: PropTypes.number
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireSettings,
  questionnaireAnsweredQuestions,
  questionnaireResources
);

SubCompetencyResultsList.defaultProps = Object.assign(
  {
    competencyIndex: 0,
    subCompetencyIndex: 0,
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireSettingsDefault,
  questionnaireAnsweredQuestionsDefault,
  questionnaireResourcesDefault
);

export default withStyles(styles)(SubCompetencyResultsList);
