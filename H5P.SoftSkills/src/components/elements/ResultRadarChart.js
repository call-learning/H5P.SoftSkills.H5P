import RadarChart from 'recharts/lib/chart/RadarChart';
import Radar from 'recharts/lib/polar/Radar';
import PolarGrid from 'recharts/lib/polar/PolarGrid';
import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import { withStyles } from '@material-ui/core/styles';
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis';
import PropTypes from 'prop-types';
import {
  simpleResultsType, simpleResultsTypeDefault
} from '../../utils/CommonProptypes';
import Text from 'recharts/lib/component/Text';
import LabelList from 'recharts/lib/component/LabelList';

const MIN_ITEM_RADAR = 3;

const MAX_LABEL_CHARACTERS = 30;

function truncateLabel (text) {
  return (text.length > MAX_LABEL_CHARACTERS) ? text.substring(0, MAX_LABEL_CHARACTERS) + '...' : text;
}

const CompetencyLabel = (props) => {
  const { payload, x, y, textAnchor, resultsList, ...otherprops } = props;
  return (
    <text x={x} y={y} textAnchor={textAnchor}>
      <tspan className="label-compname" textAnchor={textAnchor}>{truncateLabel(resultsList[payload.index].label)}
      </tspan>
      <tspan className="label-percent" dx={-payload.offset} dy={'1em'}>{resultsList[payload.index].value}%</tspan>
    </text>
  );
};

const styles = theme => ({
  innerRadar: {
    stroke: theme.palette.primary.dark,
    fill: theme.palette.primary.main,
    fillOpacity: 0.5
  },
  root: {
    strokeWidth: '3px',
    '& .label-compname': {
      fill: theme.palette.secondary.main
    },
    '& .label-percent': {
      fill: theme.palette.secondary.dark,
      fontWeight: 'bold'
    }
  }
});

function ResultRadarChart (props) {
  const { classes } = props;
  // Here if there are less than 4 competenciesResults for this competency, we pad them so to have at least 4
  let competenciesResults = props.resultsList;
  if (competenciesResults.length < MIN_ITEM_RADAR) {
    const missingResults = MIN_ITEM_RADAR - competenciesResults.length;
    const itemToPush = { label: '', value: 100 };
    competenciesResults.splice(competenciesResults.length / 2, 0, itemToPush);
    for (let missing = 1; missing < missingResults; missing++) {
      if (missing % 2) {
        competenciesResults.push(itemToPush);
      } else {
        competenciesResults.unshift(itemToPush);
      }
    }
  }
  return <ResponsiveContainer minHeight={props.graphSize} minWidth={props.graphSize} className={classes.root}>
    <RadarChart data={competenciesResults}>
      <PolarGrid className={classes.radarGridStyle}/>
      {
        props.hasLabels ? <PolarAngleAxis data={competenciesResults}
                                          tick={<CompetencyLabel resultsList={props.resultsList}/>}/>
          : ''
      }
      <Radar name="Competency" dataKey="value" className={classes.innerRadar}/>
    </RadarChart>
  </ResponsiveContainer>;
}

ResultRadarChart.propTypes = {
  graphSize: PropTypes.number,
  hasLabels: PropTypes.bool,
  resultsList: simpleResultsType
};

ResultRadarChart.defaultProps = {
  graphSize: 150,
  hasLabels: false,
  resultsList: simpleResultsTypeDefault
};

export default withStyles(styles)(ResultRadarChart);
