import React from 'react';
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
  questionnaireResources,
  questionnaireResourcesDefault, questionnaireSettings, questionnaireSettingsDefault
} from '../../utils/CommonProptypes';
import { computeProgressPerCompetency, isFullyAcquired } from '../../utils/ComponentsUtils';
import QuestionnaireResultsPage from './QuestionaireResultsPage';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';
import PropTypes from 'prop-types';

function CompetencyResultsPageWithRoute (props) {
  let { compid } = useParams();
  let history = useHistory();
  const topNavigation = (<NavigationButton isBack onClick={(e)=> { history.push('/')}} ><H5PTranslatedText text='back'/></NavigationButton>);
  return (<CompetencyResultsPage {...props} competencyIndex={parseInt(compid)} topNavigation={topNavigation}/>);
}

function SubCompetencyResultsPageWithRoute (props) {
  let { compid, subcompid } = useParams();
  let history = useHistory();
  const topNavigation = (<NavigationButton isBack onClick={(e)=> { history.push(`/competencies/${compid}`)}} ><H5PTranslatedText text='back'/></NavigationButton>);
  return (<SubCompetencyResultsPage {...props} subCompetencyIndex={parseInt(subcompid)}
                                    competencyIndex={parseInt(compid)}
                                    topNavigation={topNavigation}
  />);
}

function ResultsPage (props) {
  let history = useHistory();
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
  return (
    <Switch>
      <Route path="/competencies/:compid/subcomp/:subcompid">
        <SubCompetencyResultsPageWithRoute {...props}
                                           results={allCompetenciesResults}/>
      </Route>
      <Route path="/competencies/:compid">
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

ResultsPage.propTypes = Object.assign({
    handleReviewQuestionnaire: PropTypes.func,
    handleRestartQuestionnaire: PropTypes.func
  },
  questionnaireSettings,
  questionsByCompetencyAndSubCompetencies,
  questionnaireAnsweredQuestions,
  questionnaireResources
);

ResultsPage.defaultProps = Object.assign({
    handleReviewQuestionnaire: () => null,
    handleRestartQuestionnaire: () => null,
  },
  questionnaireSettingsDefault,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireAnsweredQuestionsDefault,
  questionnaireResourcesDefault
);

export default ResultsPage;

export const RoutedResultsPage = (props) => (
  <MemoryRouter>
    <ResultsPage {...props} />
  </MemoryRouter>);


