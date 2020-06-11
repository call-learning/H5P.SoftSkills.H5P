import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { shadows } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  'label': {
    textTransform: 'initial',
  }
});

const NavigationButton = withStyles(styles)((props) => {
  const { classes, isNext, isBack, ...otherprops } = props;
  return (
    <Button className={classes.label} {...otherprops}
            variant={isNext? "contained": "outlined"}
            color="primary"
            startIcon={isBack ? <ArrowBackIcon/> : ''}
            endIcon={isNext ? <ArrowForwardIcon/> : ''}
    >
      {props.children}
    </Button>);
});

NavigationButton.propTypes = {
  components: PropTypes.arrayOf(PropTypes.element),
  isNext: PropTypes.bool,
  isBack: PropTypes.bool,
};
NavigationButton.defaultProps = {
  components: [],
  isNext: false,
  isBack: false,
};

export default NavigationButton;
