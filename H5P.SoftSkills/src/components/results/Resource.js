import React  from 'react';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { resourceCreateMarkup } from '../../utils/ComponentsUtils';
import Typography from '@material-ui/core/Typography';
import { questionnaireResource, questionnaireResourceDefault } from '../../utils/CommonProptypes';
import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';

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
  return (
    <Box display="flex" flexDirection="row" >
      <Box width={"20%"} alignSelf={"center"} px={3}>{
        props.resource.imageUrl ? <img src={props.resource.imageUrl} alt={""} role="presentation"/>:
          <ContactSupportIcon  style={{ fontSize: 50 }}/>
      }</Box>
      <Box flexGrow={1}>
        <Typography>
        <span dangerouslySetInnerHTML={resourceCreateMarkup(props.resource.content)}/>
        </Typography>
      </Box>
    </Box>
  );
}

Resource.propTypes = questionnaireResource;

Resource.defaultProps = questionnaireResourceDefault;

export default withStyles(styles)(Resource);
