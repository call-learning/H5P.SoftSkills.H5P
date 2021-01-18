import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const WAVEBOX_HEIGHT = 300;
const CONTENT_HEIGHT = 180;
const CONTENT_MARGIN = 75;
const styles = theme => ({
  waveHeadingBox: {
    background: 'linear-gradient(78deg, #bb0e29 48%, #ffffff 200%)',
    minHeight: '245px',
    padding: "0px",
    position: 'relative',
  },
  waveHeadingShape: {
    minHeight: `${CONTENT_HEIGHT-CONTENT_MARGIN}px`,
    fill: "#ffffff",
    '& path:first-child': {
      opacity: 0.1
    },
    '& path:nth-child(2)': {
      opacity: 0.12
    },
    '& path:nth-child(3)': {
      opacity: 0.18
    },
    '& path:nth-child(4)': {
      opacity: 0.33
    },
    '& path:nth-child(5)': {
      opacity: 1
    },
    width: "100%",
    height: "100%",
  },
  waveDividerWrap: {
    width: '100%',
    bottom: `0px`,
    height:`${CONTENT_HEIGHT-CONTENT_MARGIN}px`,
    margin: '0px',
    position: 'absolute'
  },
  title: {
    paddingTop:'2em',
    fontStyle: 'italic',
    fontWeight: 'bolder',
    letterSpacing: 0,
    lineHeight: 1.33,
    whiteSpace: 'pre-wrap',
    color: 'white',
    '&::first-line': {
      fontSize: '0.6em',
      fontStyle: 'normal',
      lineHeight: 2.5
    }
  }
});

const WaveHeading = withStyles(styles)((props) => {
  const { classes } = props;
  return (
    <Container className={classes.waveHeadingBox} maxWidth={false}>
      <Container maxWidth={'md'}><Typography variant="h3" className={classes.title}>{props.title}</Typography></Container>
      <div className={classes.waveDividerWrap}>
        <svg className={classes.waveHeadingShape} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1000 ${WAVEBOX_HEIGHT}`} preserveAspectRatio="none">
          <path
            d="M 1014 264 v 122 h -808 l -172 -86 s 310.42 -22.84 402 -79 c 106 -65 154 -61 268 -12 c 107 46 195.11 5.94 275 137 z"/>
          <path
            d="M -302 55 s 235.27 208.25 352 159 c 128 -54 233 -98 303 -73 c 92.68 33.1 181.28 115.19 235 108 c 104.9 -14 176.52 -173.06 267 -118 c 85.61 52.09 145 123 145 123 v 74 l -1306 10 z"/>
          <path
            d="M -286 255 s 214 -103 338 -129 s 203 29 384 101 c 145.57 57.91 178.7 50.79 272 0 c 79 -43 301 -224 385 -63 c 53 101.63 -62 129 -62 129 l -107 84 l -1212 12 z"/>
          <path
            d="M -24 69 s 299.68 301.66 413 245 c 8 -4 233 2 284 42 c 17.47 13.7 172 -132 217 -174 c 54.8 -51.15 128 -90 188 -39 c 76.12 64.7 118 99 118 99 l -12 132 l -1212 12 z"/>
          <path
            d="M -12 201 s 70 83 194 57 s 160.29 -36.77 274 6 c 109 41 184.82 24.36 265 -15 c 55 -27 116.5 -57.69 214 4 c 49 31 95 26 95 26 l -6 151 l -1036 10 z"/>
        </svg>
      </div>
    </Container>);
});

export default WaveHeading;
