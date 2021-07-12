import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProgressData } from '../utils/ComponentsUtils';
import { CompetenciesContext } from '../contexts/CompetenciesContext';
import CompetencyPage from '../components/questionnaire/CompetencyPage';
import QuestionWrapper from './QuestionWrapper';
import {
  answerQuestionAndNavigateToNext, finishQuestionnaireAndSaveData,
  nextCompetency,
  previousCompetency
} from '../actions/questionnaire';
import { H5PContext } from '../contexts/H5PContext';


const CompetencyPageContainer = () =>{
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.navigation)
  const answeredQuestions = useSelector((state) => state.answeredQuestions)
  const allCompetencies = useContext(CompetenciesContext);
  const h5pContext = useContext(H5PContext);
  const progressData = getProgressData(allCompetencies, answeredQuestions);

  return (<CompetencyPage questionsByCompetencyAndSubCompetencies={allCompetencies}
                          progressData={progressData}
                          questionComponent={QuestionWrapper}
                          currentCompetencyIndex={navigation.currentCompetencyIndex}
                          handleSelectAnswer={(qid,value) =>
                            dispatch(answerQuestionAndNavigateToNext(qid,value,allCompetencies))
                          }
                          handleFinishAndSubmit={
                            () => dispatch(finishQuestionnaireAndSaveData(h5pContext && h5pContext.finishAction))}
                          handleNextCompetency={() => dispatch(nextCompetency(allCompetencies))}
                          handlePreviousCompetency={() => dispatch(previousCompetency(allCompetencies))}
  />);
};

export default CompetencyPageContainer;
