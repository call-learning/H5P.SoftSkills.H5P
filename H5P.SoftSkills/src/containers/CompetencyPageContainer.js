import React, { useContext } from 'react';
import { getProgressData, getTotalQuestionCountCompetency } from '../utils/ComponentsUtils';
import { connect } from 'react-redux';
import { CompetenciesContext } from '../contexts/CompetenciesContext';
import CompetencyPage from '../components/questionnaire/CompetencyPage';
import QuestionWrapper from './QuestionWrapper';
import {
  answerQuestionAndNavigateToNext, finishQuestionnaireAndSaveData,
  nextCompetency,
  previousCompetency
} from '../actions/questionnaire';
import { H5PContext } from '../contexts/H5PContext';


const CompetencyPageContainer = (props) =>{
  const allCompetencies = useContext(CompetenciesContext);
  const progressData = getProgressData(allCompetencies, props.answeredQuestions);
  const h5pcontext = useContext(H5PContext);
  return (<CompetencyPage questionsByCompetencyAndSubCompetencies={allCompetencies}
                          progressData={progressData}
                          questionComponent={QuestionWrapper}
                          currentCompetencyIndex={props.navigation.currentCompetencyIndex}
                          handleSelectAnswer={(qid,value) =>
                            props.dispatch(answerQuestionAndNavigateToNext(qid,value,allCompetencies))
                          }
                          handleFinishAndSubmit={
                            () => props.dispatch(finishQuestionnaireAndSaveData(h5pcontext && h5pcontext.finishAction))}
                          handleNextCompetency={() => props.dispatch(nextCompetency(allCompetencies))}
                          handlePreviousCompetency={() => props.dispatch(previousCompetency(allCompetencies))}
  />);
};

const mapStateToProps = (state) => {
  const { navigation, answeredQuestions } = state;
  return {
    navigation: navigation,
    answeredQuestions: answeredQuestions,
  };
};

export default connect(mapStateToProps)(CompetencyPageContainer);
