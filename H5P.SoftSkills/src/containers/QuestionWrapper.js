import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Question from '../components/questionnaire/Question';
import { PossibleAnswersContext } from '../contexts/PossibleAnswersContext';
import { ANSWER_NOT_ANSWERED, INDEX_NO_VALUE } from '../constants/QuestionnaireConstants';
import { Element, scroller } from 'react-scroll';
import usePrevious from '../utils/usePrevious'
import PropTypes from 'prop-types'

const QuestionWrapper = (props) => {
  const [forceEnabled, setForceEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState();
  const [selectedItemId, setSelectedItemId] = useState();
  const navigation = useSelector((state) => state.navigation);
  const answeredQuestions = useSelector((state) => state.answeredQuestions);
  const prevIsDisabled = usePrevious(isDisabled);

  useEffect(() => {
    setIsDisabled(getDisabled(navigation, props));
    setSelectedItemId(getSelectedItemId(answeredQuestions, props));
  }, [])

  useEffect(() => {
    if (prevIsDisabled && !isDisabled) {
      const questionID = `question-${props.questionID}`;
      const containerID = 'competencyPageContainer';

      const questionElem = scroller.get(questionID);

      const rect = questionElem.getBoundingClientRect();

      const needsScroll = (
        rect.top < 0 ||
        rect.bottom > questionElem.offsetParent.getBoundingClientRect().height
      );

      if (needsScroll) {
        scroller.scrollTo(questionID, {
          duration: 800,
          delay: 3,
          containerId: containerID,
          smooth: true
        });
      }
    }
  }, [isDisabled]);

  useEffect(() => {
    // If answer already there we just fetch it
    setIsDisabled(getDisabled(navigation, props));
    setSelectedItemId(getSelectedItemId(answeredQuestions, props));
  }, [answeredQuestions, navigation]);

  const getDisabled = (navigation, props) => {
    return navigation.questionGlobalIndex === INDEX_NO_VALUE ||
      !(navigation.questionGlobalIndex === Number.parseInt(props.questionID));
  }

  const getSelectedItemId = (answeredQuestions, props) => {
    return answeredQuestions.reduce(
      (value, answerItem) => (
        (answerItem.questionGlobalIndex === Number.parseInt(props.questionID)) ? answerItem.answerId : value),
      ANSWER_NOT_ANSWERED
    );
  }


  return (
    <Element name={`question-${props.questionID}`}>
      <PossibleAnswersContext.Consumer>
        {allPossibleAnswers =>
          (<Question
            possibleAnswers={allPossibleAnswers}
            {...props}
            selectedItemId={selectedItemId}
            isDisabled={forceEnabled ? false : isDisabled}
            handleSelectAnswer={(questionID, value) => {
              setForceEnabled(false)
              props.handleSelectAnswer(questionID, value)
            }}
            handleEnableQuestion={() => setForceEnabled(true)}
          />)}
      </PossibleAnswersContext.Consumer>
    </Element>
  );
}

QuestionWrapper.propTypes = {
  questionID: PropTypes.string,
  handleSelectAnswer: PropTypes.func,
};

export default QuestionWrapper;

