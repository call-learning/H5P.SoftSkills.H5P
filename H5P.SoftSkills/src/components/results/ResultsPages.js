import React from 'react';
import {
  MemoryRouter,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams
} from 'react-router-dom';
import SubCompetencyResultsPage from './SubCompetencyResultsPage';
import CompetencyResultsPage from './CompetencyResultsPage';
import {
  questionnaireAnsweredQuestionsDefault,
  possibleAnswers,
  possibleAnswersDefault,
  questionsByCompetencyAndSubCompetencies,
  questionnaireCompetenciesQuestionsDefault, questionnaireAnsweredQuestions
} from '../../utils/CommonProptypes';
import { computeProgressPerCompetency } from '../../utils/ComponentsUtils';
import QuestionnaireResultsPage from './QuestionaireResultsPage';
import Button from '@material-ui/core/Button';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';

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
  let { path, url } = useRouteMatch();
  const handleViewCompetencyClick = (compIndex) => {
    history.push(`/competencies/${compIndex}`);
  };
  const handleViewSubCompetencyClick = (compIndex, subCompIndex) => {
    history.push(`/competencies/${compIndex}/subcomp/${subCompIndex}`);
  };
  const allCompetenciesResults = computeProgressPerCompetency(
    props.questionsByCompetencyAndSubCompetencies,
    props.answeredQuestions,
    props.possibleAnswers
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
          handleViewCompetencyClick={handleViewCompetencyClick}/>
      </Route>
    </Switch>
  );
}

ResultsPage.propTypes = Object.assign({},
  possibleAnswers,
  questionsByCompetencyAndSubCompetencies,
  questionnaireAnsweredQuestions
);

ResultsPage.defaultProps = Object.assign({},
  possibleAnswersDefault,
  questionnaireCompetenciesQuestionsDefault,
  questionnaireAnsweredQuestionsDefault
);

export default ResultsPage;
export const RoutedResultsPage = (props) => (
  <MemoryRouter>
    <ResultsPage {...props} />
  </MemoryRouter>);


