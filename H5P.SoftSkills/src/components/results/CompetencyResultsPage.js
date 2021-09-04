import React, { useContext } from 'react';
import {
  Box,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getCompetencyImageFromIndex } from '../../utils/ComponentsUtils';
import Container from '@material-ui/core/Container';
import ResultRadarChart from '../elements/ResultRadarChart';
import PropTypes from 'prop-types';
import {
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault, questionnaireResults, questionnaireResultsDefault
} from '../../utils/CommonProptypes';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import HorizontalCardWithAction from '../elements/HorizontalCardWithAction';
import { H5PContext } from '../../contexts/H5PContext';

const useStyles = makeStyles(theme => ({
  cardLike: {
    boxShadow: '0 7px 17px 0 rgba(0, 0, 0, 0.2)'
  },
  cardLayout: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  }
}));

const CompetencyResultsPage = (props) => {
  const classes = useStyles(props);
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
  const currentCompetenyResults = props.results.competenciesResults[props.competencyIndex];
  const h5pContext = useContext(H5PContext);
  return (
    <Container maxWidth={'md'}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pt={2}>

        <Box alignSelf="flex-start">{props.topNavigation}</Box>
        <Box><img className="SuccessImage"
                  src={getCompetencyImageFromIndex(props.competencyIndex, undefined, h5pContext.contentId)} alt=""
                  role="presentation"/></Box>

        <Typography variant="subtitle2">{currentCompetency.label}</Typography>
        <ResultRadarChart resultsList={currentCompetenyResults.subCompetenciesResults} hasLabels
                          graphSize={300}/>
        <Box>
          <Typography variant="h4"><H5PTranslatedText text="detailpercompetency"/></Typography>
        </Box>
        {
          !(props.results &&
            currentCompetenyResults &&
            currentCompetenyResults.subCompetenciesResults) ? '' :
            currentCompetenyResults.subCompetenciesResults.map((subC, subCompIndex) =>
              (<HorizontalCardWithAction
                width={'80%'} key={'resultcontainer' + subCompIndex}
                handleActionClick={(e) => props.handleViewSubCompetencyClick(props.competencyIndex, subCompIndex)}
                components={[
                  (<Box py={3} key="competencydesc">
                    <Typography variant="subtitle2">
                      <span dangerouslySetInnerHTML={{ __html: subC.label }}/></Typography>
                  </Box>),
                  (<Box py={3} key="compvalue">
                    <Typography>{Math.floor(subC.value)}%</Typography>
                  </Box>)
                ]}/>))
        }
      </Box>
    </Container>
  );
};

CompetencyResultsPage.propTypes = {
  competencyIndex: PropTypes.number,
  handleViewSubCompetencyClick: PropTypes.func,
  topNavigation: PropTypes.element,
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireResults
};

CompetencyResultsPage.defaultProps = {
  competencyIndex: 0,
  handleViewSubCompetencyClick: null,
  topNavigation: (<div/>),
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireResultsDefault
};

export default CompetencyResultsPage;
