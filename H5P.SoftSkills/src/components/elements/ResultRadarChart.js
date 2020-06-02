import RadarChart from 'recharts/lib/chart/RadarChart';
import Radar from 'recharts/lib/polar/Radar';
import PolarGrid from 'recharts/lib/polar/PolarGrid';
import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import { withStyles } from '@material-ui/core/styles';
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis';
import PropTypes from 'prop-types';
import {
  questionnaireResults, questionnaireResultsDefault
} from '../../utils/CommonProptypes';

const MIN_ITEM_RADAR = 3;

const styles = theme => ({
  innerRadar: {
    stroke: theme.palette.primary.dark,
    fill: theme.palette.primary.light
  },
  radarGridStyle: {
    strokeWidth: "3px"
  }
});


function ResultRadarChart (props) {
  const { classes } = props;
  // Here if there are less than 4 results for this competency, we pad them so to have at least 4
  let results = props.results;
  if (results.length < MIN_ITEM_RADAR) {
    const missingResults = MIN_ITEM_RADAR - results.length;
    const itemToPush = { label: '', value: 100 };
    results.splice(results.length / 2, 0, itemToPush);
    for (let missing = 1; missing < missingResults; missing++) {
      if (missing % 2) {
        results.push(itemToPush);
      } else {
        results.unshift(itemToPush);
      }
    }
  }
  return <ResponsiveContainer minHeight={250} minWidth={250} className={classes.radarGridStyle}>
    <RadarChart outerRadius={props.graphSize} data={results}>
      <PolarGrid className={classes.radarGridStyle}/>
      {
        props.hasLabels ? <PolarAngleAxis dataKey="label" data={results} />
          : ''
      }
      <Radar name="Competency" dataKey="value" className={classes.innerRadar}/>
    </RadarChart>
  </ResponsiveContainer>
}

ResultRadarChart.propTypes = Object.assign(
  {
    graphSize: PropTypes.number,
    hasLabels:  PropTypes.bool

  },
  questionnaireResults
);

ResultRadarChart.defaultProps = Object.assign(
  {
    graphSize: 50,
    hasLabels: false
  },
  questionnaireResultsDefault
);



export default withStyles(styles)(ResultRadarChart);
