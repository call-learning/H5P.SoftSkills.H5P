import React  from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { questionnaireResource, questionnaireResourceDefault } from '../../utils/CommonProptypes';
import { resourceCreateMarkup } from '../../utils/ComponentsUtils';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

function Resource (props) {
  const { classes } = props;
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const panelName = `resource`;
  return (
      <ExpansionPanel expanded={expanded === panelName} onChange={handleChange(panelName)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls={`${panelName}-content`}
          id={`${panelName}-header`}
        >
          <Typography className={classes.heading}>{props.resource.label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <span dangerouslySetInnerHTML={resourceCreateMarkup(props.resource.content)}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  );
}

Resource.propTypes = questionnaireResource;

Resource.defaultProps = questionnaireResourceDefault;

export default withStyles(styles)(Resource);
