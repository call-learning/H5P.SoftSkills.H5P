import {
  Box,
  Grid,
} from '@material-ui/core';
import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { ArrowForward } from '@material-ui/icons';

const styles = theme => ({
  'cardLike': {
    boxShadow: '0 7px 17px 0 rgba(0, 0, 0, 0.2)',
    marginTop: "1em",
    marginBottom: "1em"
  }
});

function HorizontalCardWithAction (props) {
  const { classes } = props;
  const componentMiddleIndex = Math.floor(props.components.length/2);
  return (
    <Container className={classes.cardLike}>
      <Box display="flex" alignItems="center">
        {
          props.components.map((component, index) => (<Box key={index} flexGrow={(index === componentMiddleIndex)?1:0}>{component}</Box>))
        }
        <Box flexShrink={1} ml="auto">
          <Fab color="primary"  onClick={props.handleActionClick} >
            <ArrowForward/>
          </Fab>
        </Box>
      </Box>
    </Container>
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

export default withStyles(styles)(HorizontalCardWithAction);
