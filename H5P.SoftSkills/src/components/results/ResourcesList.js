import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Resource from './Resource';
import { questionnaireResources } from '../../utils/CommonProptypes';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

const ResourcesList = withStyles(styles)((props) => {
    const { classes } = props;
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    return (
      <Container>
        {
          props.resourcesByContext.map((context, index) => {
            const panelName = `context-${index}`;
            return (
              <ExpansionPanel key={context.id} expanded={expanded === panelName} onChange={handleChange(panelName)}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls={`${panelName}-content`}
                  id={`${panelName}-header`}
                >
                  <Typography className={classes.heading}>{`${index+1}. ${context.label}`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box display="flex" flexDirection="column" width="100%">
                    {
                      context.resources.map((resource) => <Resource key={resource.id} resource={resource}/>)
                    }
                  </Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </Container>
    );
  }
);

ResourcesList.propTypes = {
  resourcesByContext: PropTypes.arrayOf(
    PropTypes.shape(Object.assign({
        label: PropTypes.string,
      },
      questionnaireResources
      )
    )
  )
};

ResourcesList.defaultProps = {
  resourcesByContext: []
};

export default withStyles(styles)(ResourcesList);
