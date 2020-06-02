import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
// From https://github.com/kimmobrunfeldt/progressbar.js/blob/master/src/circle.js

const styles = theme => ({
  'circle': {
    position: 'relative'
  },
  'outerCircleActive': {
    stroke: theme.palette.primary.main,
    fill: theme.palette.primary.main
  },
  'outerCircle': {
    stroke: theme.palette.grey['500'],
    fill: theme.palette.grey['500']
  },
  'innerCircle': {
    stroke: theme.palette.grey['200']
  },
  'progressCircle': {
    stroke: theme.palette.grey['900']
  },
  'innerText': {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }
});

let getPathFromRadius = (centerX, centerY, radius) => {
  return (`M ${centerX},${centerY} m 0,-${radius} a ${radius},${radius} 0 1 1\
 0,${radius * 2} a ${radius},${radius} 0 1 1 0,-${radius * 2}`);
};

const DEFAULT_SIZE_PIX = 40;
const PROGRESS_CIRCLE_THICKNESS_RELATIVE = 6;


function  CircularProgressWithStep(props) {
    const { classes } = props;
    const outerRadius = (props.size ? props.size : DEFAULT_SIZE_PIX) / 2;
    const outerCircleThickness = outerRadius / PROGRESS_CIRCLE_THICKNESS_RELATIVE;
    const progressCircleThickness = outerRadius / PROGRESS_CIRCLE_THICKNESS_RELATIVE * 1.5;
    const innerRadius = outerRadius - outerCircleThickness;

    const centerPosition = outerRadius + outerCircleThickness;
    const pathOuterCircle = getPathFromRadius(centerPosition, centerPosition, outerRadius);
    const pathInnerCircle = getPathFromRadius(centerPosition, centerPosition, innerRadius);
    const outerBoxSize = outerRadius * 2 + outerCircleThickness * 2;

    // Now the progress bar
    const innerCircleLength = Math.PI * innerRadius * 2;
    const progressValueOnCircle = innerCircleLength * (1 - props.value / 100);
    const isFinished = (props.value === 100);

    return (
      <Box className={classes.circle} width={outerBoxSize} height={outerBoxSize}>
        <svg viewBox={`0 0 ${outerBoxSize} ${outerBoxSize}`}>
          <path d={pathOuterCircle}
                className={props.isActive || isFinished ? classes.outerCircleActive : classes.outerCircle}
                strokeWidth={outerCircleThickness}
                fillOpacity={isFinished ? 1 : 0}/>
          {props.value > 0 && props.value < 100 ?
            (<g>
              <path d={pathInnerCircle} className={classes.innerCircle} strokeWidth={progressCircleThickness}
                    fillOpacity="0"/>

              <path d={pathInnerCircle} className={classes.progressCircle} strokeWidth={progressCircleThickness}
                    fillOpacity="0"
                    strokeDasharray={`${innerCircleLength}, ${innerCircleLength}`}
                    strokeDashoffset={progressValueOnCircle}
              />
            </g>) : ''
          }
        </svg>
        {
          <Typography className={classes.innerText}>{isFinished ? <CheckIcon
            style={{ color: 'white' }}/> : props.insideText}</Typography>
        }
      </Box>
    );
}

CircularProgressWithStep.propTypes = {
  insideText: PropTypes.string,
  value: PropTypes.number
};
CircularProgressWithStep.defaultProps = {
  insideText: "",
  value: 0
};

export default withStyles(styles)(CircularProgressWithStep);
