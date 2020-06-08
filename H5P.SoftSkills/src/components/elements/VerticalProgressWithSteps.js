import React from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgressWithStep from './CircularProgressWithStep';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    padding: 'initial',
  },

  horizontalProgress: {
    width: '3px',
    backgroundColor: theme.palette.grey['500'],
    margin: 'auto',
    padding: 'initial',
    flexGrow: 1,
    boxShadow: "0 36px 48px 0 rgba(0, 0, 0, 0.13), 0 8px 11px 0 rgba(0, 0, 0, 0.13)",
  },
  horizontalProgressActive: {
    backgroundColor: theme.palette.primary.main
  }
});

function VerticalProgressWithSteps (props) {
  const { classes } = props;
  const currentStep = props.progressInfo.reduce(
    (carry, element, index) => (!carry && element !== 0 ? index : carry),
    0
  ); // Calculate the last step by looking a current values, if <> 0 then it is a step in process.
  return (
    <Box className={classes.root} display="flex" flexDirection="column" alignItems="center" alignContent="center"
    height="100%">
      {
        props.progressInfo.map((progressPercent, index) => {
            const hLineClasses =
              `${classes.horizontalProgress} ${currentStep >= index ? classes.horizontalProgressActive : ''}`;

            return (<Box display="flex" flexDirection="column" flexGrow={1} key={index}>
              <Box flexGrow={1} className={hLineClasses}>&nbsp;</Box>
              <Box>
                <CircularProgressWithStep
                  value={progressPercent}
                  insideText={(index+1).toString()}
                  isActive={currentStep >= index}
                />
              </Box>
            </Box>);
          }
        )
      }
      <Box flexGrow={1} className={classes.horizontalProgress} justifyContent="flex-end"/>
    </Box>
  );
}

VerticalProgressWithSteps.propTypes = {
  progressInfo: PropTypes.arrayOf(
    PropTypes.number
  )
};

VerticalProgressWithSteps.defaultProps = {
  progressInfo: []
};
export default withStyles(styles)(VerticalProgressWithSteps);
