import React from 'react';
import { Grid, Button, Container, Box } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { getCompetencyImageFromIndex, resourceCreateMarkup } from '../../utils/ComponentsUtils';
import { questionnaireSettings, questionnaireSettingsDefault } from '../../utils/CommonProptypes';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WaveHeading from '../elements/WaveHeading';
import Typography from '@material-ui/core/Typography';
import BottomRectangle from '../elements/BottomRectangle';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import 'material-design-icons/iconfont/material-icons.css';
import NavigationButton from '../elements/NavigationButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  competencyTitle: {
    textTransform: 'lowercase',
    textAlign: "justify"
  }
});

const InstructionPage = withStyles(styles)((props) => {
  const { classes } = props;
  return (<Container maxWidth={false}>
      <Container maxWidth={false}>
        <WaveHeading title={props.welcomeTitle}/>
      </Container>
      <Container maxWidth={'md'}>
        <Box xs={6} p={"3em"}>
          <Typography color="textSecondary">
            <span dangerouslySetInnerHTML={resourceCreateMarkup(props.generalInstructions)}/>
          </Typography>
        </Box>

        <Box>
          <Box display="flex" justifyContent="center" py={2}>
            {
              props.competenciesDesc.map((e, index) => {
                  return (<Box display="flex" flexDirection="column" key={index} width="30%" px={2}>
                    <Box pb={3}><img
                      src={getCompetencyImageFromIndex(index)}
                      alt={e.title}
                      role="presentation"/></Box>
                    <Box>
                      <BottomRectangle/>
                    </Box>
                    <Box>
                    <Box><Typography variant="subtitle1" className={classes.competencyTitle}>{e.title}</Typography></Box>
                    <Box><Typography color="textSecondary">{e.description}</Typography></Box>
                    </Box>
                  </Box>);
                }
              )
            }
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" py={2}>
          <Box display="flex" flexDirection="column">
            {
              props.instructionsDesc.map((e, key) => {
                  return (<Box justify="center"
                               alignItems="center"
                               key={key}
                               display="flex"
                               flexDirection="row">
                    <Icon fontSize="large" color="primary">{e.icon}</Icon>
                    <Box m={'1em'}><Typography variant="body2" color="textSecondary">{e.text}</Typography></Box>
                  </Box>);
                }
              )
            }
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box my={'2em'}>
            {
              props.isReadyToStart ?
                (<NavigationButton isNext
                                   onClick={props.startQuestionnaire}><H5PTranslatedText text='startquestionnaire'/>
                  </NavigationButton>
                ) : <CircularProgress/>
            }
          </Box>
        </Box>
      </Container>
    </Container>
  );
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
