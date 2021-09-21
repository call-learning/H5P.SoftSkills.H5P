import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MemoryRouter,
  Switch,
  Route,
  useHistory,
  useParams
} from 'react-router-dom';
import SubCompetencyResultsPage from './SubCompetencyResultsPage';
import CompetencyResultsPage from './CompetencyResultsPage';
import {
  questionnaireAnsweredQuestionsDefault,
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireAnsweredQuestions,
  questionnaireResourcesDefault, questionnaireSettings, questionnaireSettingsDefault
} from '../../utils/CommonProptypes';
import { computeProgressPerCompetency, isFullyAcquired } from '../../utils/ComponentsUtils';
import QuestionnaireResultsPage from './QuestionaireResultsPage';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';
import { H5PContext } from '../../contexts/H5PContext';

function CompetencyResultsPageWithRoute (props) {
  const { compId } = useParams();
  const history = useHistory();
  const topNavigation = (<NavigationButton isBack onClick={()=> { history.push('/')}} ><H5PTranslatedText text='back'/></NavigationButton>);
  return (<CompetencyResultsPage {...props} competencyIndex={parseInt(compId)} topNavigation={topNavigation}/>);
}

function SubCompetencyResultsPageWithRoute (props) {
  const { compId, subCompId } = useParams();
  const history = useHistory();
  const topNavigation = (<NavigationButton isBack onClick={()=> { history.push(`/competencies/${compId}`)}} ><H5PTranslatedText text='back'/></NavigationButton>);
  return (<SubCompetencyResultsPage {...props} subCompetencyIndex={parseInt(subCompId)}
                                    competencyIndex={parseInt(compId)}
                                    topNavigation={topNavigation}
  />);
}

function ResultsPage (props) {
  const history = useHistory();
  const handleViewCompetencyClick = (compIndex) => {
    history.push(`/competencies/${compIndex}`);
  };
  const handleViewSubCompetencyClick = (compIndex, subCompIndex) => {
    history.push(`/competencies/${compIndex}/subcomp/${subCompIndex}`);
  };
  const handleObtainMyBadgeClick = () => {
    history.push(`/obtainmybadge`);
  };
  const allCompetenciesResults = computeProgressPerCompetency(
    props.questionsByCompetencyAndSubCompetencies,
    props.answeredQuestions,
    props.settings
  );
  const h5pContext = useContext(H5PContext);
  useEffect(() => {
    if (h5pContext && typeof h5pContext.resizeAction !== "undefined") {
      h5pContext.resizeAction();
    }
  }, []);
  return (
    <Switch>
      <Route path="/competencies/:compId/subcomp/:subCompId">
        <SubCompetencyResultsPageWithRoute {...props}
                                           results={allCompetenciesResults}/>
      </Route>
      <Route path="/competencies/:compId">
        <CompetencyResultsPageWithRoute {...props}
                                        results={allCompetenciesResults}
                                        handleViewSubCompetencyClick={handleViewSubCompetencyClick}/>
      </Route>

      <Route path="/">
        <QuestionnaireResultsPage
          questionsByCompetencyAndSubCompetencies={props.questionsByCompetencyAndSubCompetencies}
          results={allCompetenciesResults}
          canObtainBadge=
            {
              props.settings.hasBadgeEngine &&
              ( props.settings.alwaysDeliverBadge ||
                isFullyAcquired(props.questionsByCompetencyAndSubCompetencies,props.answeredQuestions,props.settings))
            }
          handleViewCompetencyClick={handleViewCompetencyClick}
          handleObtainMyBadge={handleObtainMyBadgeClick}
          handleReviewQuestionnaire={props.handleReviewQuestionnaire}
          handleRestartQuestionnaire={props.handleRestartQuestionnaire}
        />
      </Route>
    </Switch>
  );
}

ResultsPage.propTypes = {
  handleReviewQuestionnaire: PropTypes.func,
  handleRestartQuestionnaire: PropTypes.func,
  ...questionnaireSettings,
  ...questionsByCompetencyAndSubCompetencies,
  ...questionnaireAnsweredQuestions
};

ResultsPage.defaultProps = {
  handleReviewQuestionnaire: () => null,
  handleRestartQuestionnaire: () => null,
  ...questionnaireSettingsDefault,
  ...questionnaireCompetenciesQuestionsDefault,
  ...questionnaireAnsweredQuestionsDefault
};

export default ResultsPage;

export const RoutedResultsPage = (props) => (
  <MemoryRouter>
    <ResultsPage {...props} />
  </MemoryRouter>);


