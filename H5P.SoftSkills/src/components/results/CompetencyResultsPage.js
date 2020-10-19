import {
  Box,
} from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { getCompetencyImageFromIndex, getTextValueFromPossibleValue } from '../../utils/ComponentsUtils';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import ResultRadarChart from '../elements/ResultRadarChart';
import PropTypes from 'prop-types';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault, questionnaireResults, questionnaireResultsDefault
} from '../../utils/CommonProptypes';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import HorizontalCardWithAction from '../elements/HorizontalCardWithAction';

const styles = theme => ({
  cardLike: {
    boxShadow: '0 7px 17px 0 rgba(0, 0, 0, 0.2)'
  },
  cardLayout: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  }
});

const CompetencyResultsPage = withStyles(styles)((props) => {
    const { classes } = props;
    const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
    const currentCompetenyResults = props.results.competenciesResults[props.competencyIndex];

    return (
      <Container  maxWidth={'md'}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" maxHeight={'100vh'}>

          <Box alignSelf="flex-start">{props.topNavigation}</Box>
          <Box><img className="SuccessImage" src={getCompetencyImageFromIndex(props.competencyIndex)} alt=""
                    role="presentation"/></Box>

          <Typography variant="subtitle2">{currentCompetency.label}</Typography>
          <ResultRadarChart resultsList={currentCompetenyResults.subCompetenciesResults} hasLabels
                            graphSize={300}/>
          <Box>
            <Typography variant="h4"><H5PTranslatedText text='detailpercompetency'/></Typography>
          </Box>
          {
            !(props.results &&
              currentCompetenyResults &&
              currentCompetenyResults.subCompetenciesResults) ? '' :
              currentCompetenyResults.subCompetenciesResults.map((subC, subCompIndex) =>
                (<HorizontalCardWithAction width={"80%"} key={'resultcontainer' + subCompIndex}
                                           handleActionClick={(e) => props.handleViewSubCompetencyClick(props.competencyIndex, subCompIndex)}
                                           components={[
                                             (<Box key="competencydesc">
                                               <Typography variant="subtitle2">
                                                 <span dangerouslySetInnerHTML={{__html:subC.label}}/></Typography>
                                               </Box>),
                                             (<Box key="compvalue">
                                               <Typography>{Math.floor(subC.value)}%</Typography>
                                             </Box>)
                                           ]}/>))
          }
        </Box>
      </Container>
    );
  }
);

CompetencyResultsPage.propTypes = Object.assign(
  {
    competencyIndex: PropTypes.number,
    handleViewSubCompetencyClick: PropTypes.func,
    topNavigation: PropTypes.element
  },
  questionsByCompetencyAndSubCompetencies,
  questionnaireResults
);

CompetencyResultsPage.defaultProps = Object.assign(
  {
    competencyIndex: 0,
    handleViewSubCompetencyClick: null,
    topNavigation: (<div/>)
  },
  questionnaireCompetenciesQuestionsDefault,
  questionnaireResultsDefault
);

export default withStyles(styles)(CompetencyResultsPage);
