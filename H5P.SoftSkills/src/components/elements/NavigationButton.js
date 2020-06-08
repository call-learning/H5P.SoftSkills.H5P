import React from 'react';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { shadows } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const NavigationButton = (props) => {
  const { isNext, isBack, ...otherprops } = props;
  return (
    <Box boxShadow={10}>
    <Button {...otherprops}
            variant={isNext? "contained": "outlined"}
            color="primary"
            startIcon={isBack ? <ArrowBackIcon/> : ''}
            endIcon={isNext ? <ArrowForwardIcon/> : ''}
    >
      {props.children}
    </Button>
    </Box>);
};

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
