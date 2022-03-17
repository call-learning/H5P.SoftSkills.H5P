import React, { useContext } from 'react';
import { Container, Box } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { getAbsoluteURL, resourceCreateMarkup } from '../../utils/ComponentsUtils';
import { questionnaireSettings, questionnaireSettingsDefault } from '../../utils/CommonProptypes';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import WaveHeading from '../elements/WaveHeading';
import Typography from '@material-ui/core/Typography';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import 'material-design-icons/iconfont/material-icons.css';
import NavigationButton from '../elements/NavigationButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { H5PContext } from '../../contexts/H5PContext';

const useStyles = makeStyles(theme => ({
  competencyTitle: {
    textTransform: 'lowercase',
    textAlign: 'justify'
  },
  containerNoPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  responsiveCompList: {
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    }
  },
  footerImage: {
    maxWidth: '200px'
  },
  horizontalDiv: {
    width: '3em',
    margin: '1em auto',
    border: `2px solid ${theme.palette.primary.main}`,
    background: `${theme.palette.primary.main}`,
    borderRadius: '4px',
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .05)',
    alignSelf: 'center'
  }
}));

const InstructionPage = (props) => {
  const classes = useStyles(props);
  const h5pContext = useContext(H5PContext);
  const logoFooterImageUrl = (props.footerLogo && typeof props.footerLogo.path !== "undefined") ?
    getAbsoluteURL(props.footerLogo, h5pContext.contentId)
    : null;

  return (<Container maxWidth={false} disableGutters={true} className={classes.root}>
      <Container maxWidth={false} disableGutters={true} className={classes.containerNoPadding}>
        <WaveHeading title={props.welcomeTitle}/>
      </Container>
      <Container maxWidth={'md'}>
        <Box p={'3em'}>
          <Typography color="textSecondary">
            <span dangerouslySetInnerHTML={resourceCreateMarkup(props.generalInstructions)}/>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box my={'2em'}>
            {
              props.isReadyToStart ?
                (<NavigationButton isNext
                                   onClick={() => {props.startQuestionnaire(h5pContext.startAction);}}>
                    <H5PTranslatedText text="startquestionnaire"/>
                  </NavigationButton>
                ) : <CircularProgress/>
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
        <Container display="flex" py={2}>
          <Box className={classes.horizontalDiv}></Box>
          <Typography align={'center'}>
            <span dangerouslySetInnerHTML={resourceCreateMarkup(props.footerText)}/>
          </Typography>
          <Box display="flex" justifyContent="center" padding={'2em'}>
            {
              logoFooterImageUrl ?
                (<img className={classes.footerImage} src={logoFooterImageUrl} role="presentation"/>) : ''
            }
          </Box>
        </Container>

      </Container>
    </Container>
  );
};

InstructionPage.propTypes = {
  startQuestionnaire: PropTypes.func,
  isReadyToStart: PropTypes.bool,
  ...questionnaireSettings
};

InstructionPage.defaultProps = {
  startQuestionnaire: null,
  isReadyToStart: true,
  ...questionnaireSettingsDefault
};

export default InstructionPage;
