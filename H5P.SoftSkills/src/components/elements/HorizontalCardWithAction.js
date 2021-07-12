import {
  Box,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { ArrowForward } from '@material-ui/icons';

/*
const useStyles = makeStyles(theme => ({
}));
*/

function HorizontalCardWithAction (props) {
  const { handleActionClick, components, ...otherprops } = props;
  // const classes = useStyles(props);
  return (
    <Box boxShadow={5} p={1} m={1} {...otherprops}>
      <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm:'row' }}>
        {
          components.map((component, index) => (<Box mx={4} key={index} flexGrow={(index === 0)?1:0} >{component}</Box>))
        }
        <Box flexShrink={1} ml="auto" mr={{ xs: 'auto', sm:'0px' }} pt={{ xs: 'auto', sm:'initial' }} px={3}>
          <Fab color="primary"  onClick={handleActionClick} >
            <ArrowForward />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}

HorizontalCardWithAction.propTypes = {
  handleActionClick: PropTypes.func,
  components: PropTypes.arrayOf(PropTypes.element)
};
HorizontalCardWithAction.defaultProps = {
  handleActionClick: () => null,
  components: []
};

export default HorizontalCardWithAction;
