import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  simpleResultsType, simpleResultsTypeDefault
} from '../../utils/CommonProptypes';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Bar from 'recharts/lib/cartesian/Bar';
import Tooltip from 'recharts/lib/component/Tooltip';
import BarChart from 'recharts/lib/chart/BarChart';
import Text from 'recharts/lib/component/Text';

// See https://upload.wikimedia.org/wikipedia/commons/d/de/Caret_right_font_awesome.svg
// TODO: check Rechart Symbols
const SmallTriangle = (props) => {
  return (
      <g transform={`scale(${props.size / 600})`}>
      <path
        d={'m 576,640 q 0,-26 -19,-45 L 109,147 Q 90,128 64,128 38,128 19,147 0,166 0,192 v 896 q 0,26 19,45 19,19' +
        ' 45,19 26,0 45,-19 L 557,685 q 19,-19 19,-45 z'}/>
      </g>
  );
};

const BarLabel = (props) => {
  const { x, y, stroke, value, width, height } = props;
  let paintColor = stroke;
  if (!stroke) {
    paintColor = "white";
  }
  return (
    <g transform={`translate(${x+width/2},${y+height/2})`} fill={paintColor} stroke={paintColor} >
      <text dominantBaseline="middle" textAnchor="right">{value}%</text>
      <g transform={`translate(${width/2 - height/4} ${-height/4})`}>
        <SmallTriangle size={height/4}/>
      </g>
    </g>);
};


const CompetencyLabel= (props) => {
  const { width, payload ,...otherprops } = props;
  return (
    <Text {...otherprops} className="competency-labels">{payload.value}</Text>
  );
};

const styles = theme => ({
  barChartStyle: {
    fill: theme.palette.primary.main,
    "& .competency-labels": {
      fontWeight: "bold"
    }
  }
});

function ResultBarChart (props) {
  const { classes } = props;
  return (<ResponsiveContainer height={props.graphHeight}  className={classes.root}>
    <BarChart
      layout="vertical"
      data={props.resultsList}
      barCategoryGap={8}
      margin={{ top: 20, right: 5, bottom: 30, left: 200 }}
      className={classes.barChartStyle}
    >
      <XAxis type="number" domain={[0, 100]}  scale={"linear"} axisLine={false} tickLine={false}/>
      <YAxis type="category" dataKey="label" tick={<CompetencyLabel/>}/>
      <Tooltip/>
      <CartesianGrid horizontal={false}/>
      <Bar dataKey="value" background label={<BarLabel/>} radius={[0, 4, 4, 0]}/>
    </BarChart>
    </ResponsiveContainer>
  );
}

ResultBarChart.propTypes = {
  graphHeight: PropTypes.number,
  barSize: PropTypes.number,
  resultsList: simpleResultsType
};

ResultBarChart.defaultProps = {
  graphHeight: 200,
  barSize: 30,
  resultsList: simpleResultsTypeDefault
};

export default withStyles(styles)(ResultBarChart);

