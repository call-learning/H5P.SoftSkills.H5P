import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  'label': {
    textTransform: 'initial',
  }
}));

const NavigationButton = (props) => {
  const { isNext, isBack, ...otherProps } = props;
  const classes = useStyles(props);
  return (
    <Button className={classes.label} {...otherProps}
            variant={isNext? "contained": "outlined"}
            color="primary"
            startIcon={isBack ? <ArrowBackIcon/> : ''}
            endIcon={isNext ? <ArrowForwardIcon/> : ''}
            py={1}
    >
      {props.children}
    </Button>
  );
};

NavigationButton.propTypes = {
  components: PropTypes.arrayOf(PropTypes.element),
  isNext: PropTypes.bool,
  isBack: PropTypes.bool,
  children: PropTypes.func
};
NavigationButton.defaultProps = {
  components: [],
  isNext: false,
  isBack: false,
};

export default NavigationButton;
