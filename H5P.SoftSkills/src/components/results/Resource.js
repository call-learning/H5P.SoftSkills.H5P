import React  from 'react';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { resourceCreateMarkup } from '../../utils/ComponentsUtils';
import Typography from '@material-ui/core/Typography';
import { questionnaireResource, questionnaireResourceDefault } from '../../utils/CommonProptypes';
import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';

import DescriptionIcon from '@material-ui/icons/Description';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import WebIcon from '@material-ui/icons/Web';
import SpeakerIcon from '@material-ui/icons/Speaker';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  illustrationImage: {
    maxWidth: "50px",
    maxHeight: "50px"
  },
  textBox: {
    overflowWrap: "break-word",
    wordBreak: "break-all"
  },
  icon: {
    fontSize: 50
  }
});


const ResourceIcon = withStyles(styles)((props) => {
    const { classes } = props;
    switch (props.type) {
      case 'document':
        return (<DescriptionIcon className={classes.icon}/>);
      case 'video':
        return (<VideoLibraryIcon className={classes.icon}/>);
      case 'web':
        return (<WebIcon className={classes.icon}/>);
      case 'module':
        return (<ViewModuleIcon className={classes.icon}/>);
      case 'audio':
        return (<SpeakerIcon className={classes.icon}/>);
      default:
        return (<ContactSupportIcon className={classes.icon}/>);
    }
  }
);

function Resource (props) {
  const { classes } = props;
  return (
    <Box display="flex" flexDirection="row" py={1}>
      <Box width={"50px"} alignSelf={"center"} px={3}>
        {
        props.resource.imageUrl ?
          <img className={classes.illustrationImage} src={props.resource.imageUrl} alt={""} role="presentation"/>
          :<ResourceIcon type={props.resource.type}/>
      }</Box>
      <Box className={classes.textBox}>
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
