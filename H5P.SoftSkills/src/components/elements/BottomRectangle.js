import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme=> ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: "3.5em",
    height: "3px"
  }
}));

const BottomRectangle = (props) => {
  const classes = useStyles(props);
  return (<Box className={classes.root} {...props}>&nbsp;</Box>)
};

export default BottomRectangle;
