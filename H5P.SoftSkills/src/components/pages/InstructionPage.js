import React from 'react';
import { Grid, Button, Container, Box } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { getCompetencyImageFromIndex } from '../../utils/ComponentsUtils';
import { questionnaireSettings, questionnaireSettingsDefault } from '../../utils/CommonProptypes';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WaveHeading from '../elements/WaveHeading';
import Typography from '@material-ui/core/Typography';
import BottomRectangle from '../elements/BottomRectangle';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import 'material-design-icons/iconfont/material-icons.css';
import NavigationButton from '../elements/NavigationButton';
import CircularProgressWithStep from '../elements/CircularProgressWithStep';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  generalInstructions: {
    padding: "2em"
  }
});

const InstructionPage = withStyles(styles)((props) => {
  const { classes } = props;
  return (<Grid container>
      <Grid item xs={12}>
        <WaveHeading title={props.welcomeTitle}/>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={3}> &nbsp;</Grid>
          <Grid item className={classes.generalInstructions} xs={6}>
            <Typography>{props.generalInstructions}</Typography>
            </Grid>
          <Grid item xs={3}> &nbsp;</Grid>
        </Grid>
      </Grid>

      <Grid item container justify="center" alignItems="center">
        <Grid item xs={3}> &nbsp;</Grid>
        <Grid item xs={6}>
        <Box display="flex">
          {
            props.competenciesDesc.map((e, index) => {
                return (<Box display="flex" flexDirection="column" key={index}>
                  <Container><img
                                  src={getCompetencyImageFromIndex(index)}
                                  alt={e.title}
                                  role="presentation"/></Container>
                  <Container>
                    <BottomRectangle/>
                  </Container>
                  <Container><h4>{e.title}</h4></Container>
                  <Container><p>{e.description}</p></Container>
                </Box>);
              }
            )
          }
        </Box>
        </Grid>
        <Grid item xs={3}>&nbsp;</Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center">
        <Box display="flex" flexDirection="column">
        {
          props.instructionsDesc.map((e, key) => {
              return (<Box justify="center"
                           alignItems="center"
                           key={key}
                           display="flex"
                           flexDirection="row">
                <Icon fontSize="large" color="primary">{e.icon}</Icon>
                <Box m={"1em"}><Typography>{e.text}</Typography></Box>
              </Box>);
            }
          )
        }
        </Box>
      </Grid>
      <Grid item container justify="center" alignItems="center" >
        <Box my={"2em"}>
          {
            props.isReadyToStart ?
              (        <NavigationButton isNext
                                         onClick={props.startQuestionnaire}><H5PTranslatedText text='startquestionnaire' />
                </NavigationButton>
              ): <CircularProgress/>
          }
        </Box>
      </Grid>
    </Grid>
  )
});

InstructionPage.propTypes = Object.assign(
  {
    startQuestionnaire: PropTypes.func,
    isReadyToStart: PropTypes.bool
  },
  questionnaireSettings
);


InstructionPage.defaultProps = Object.assign(
  {
    startQuestionnaire: null,
    isReadyToStart: true
  },
  questionnaireSettingsDefault
);

export default InstructionPage;
