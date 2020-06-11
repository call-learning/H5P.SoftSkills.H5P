import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: "3.5em",
    height: "3px"
  }
});

const BottomRectangle = withStyles(styles)((props) => {
  const { classes } = props;
  return (<Box className={classes.root} {...props}>&nbsp;</Box>)
});

export default BottomRectangle;
