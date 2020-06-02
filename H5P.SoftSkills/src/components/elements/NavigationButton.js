import React from 'react';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';

const NavigationButton = (props) => {
  return (
    <Button {...props}
            variant="contained"
            color="primary"
            startIcon={props.isBack ? <ArrowBackIcon/> : ''}
            endIcon={props.isNext ? <ArrowForwardIcon/> : ''}>
      {props.children}
    </Button>);
};

NavigationButton.propTypes = {
  handleActionClick: PropTypes.func,
  components: PropTypes.arrayOf(PropTypes.element)
};
NavigationButton.defaultProps = {
  handleActionClick: () => null,
  components: []
};


export default NavigationButton;
