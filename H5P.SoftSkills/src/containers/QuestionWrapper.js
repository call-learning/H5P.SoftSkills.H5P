import React  from 'react';
import { connect } from 'react-redux';
import Question from '../components/questionnaire/Question';
import { PossibleAnswersContext } from '../contexts/PossibleAnswersContext';
import { ANSWER_NOT_ANSWERED, INDEX_NO_VALUE } from '../constants/QuestionnaireConstants';
import { Element, animateScroll } from 'react-scroll';

const scroll = animateScroll;

class QuestionWrapper extends React.Component {
  constructor (props) {
    super(props);
    this.elementRef = React.createRef();
  }

  componentDidMount () {
    if (!this.props.isDisabled && this.elementRef.current) {
      // window.scrollTo(0, this.elementRef.current.offsetTop);
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    // if (prevProps.isDisabled && !this.props.isDisabled) {
    //   scroll.scrollTo(`question-${this.props.questionID}`, {
    //     duration: 800,
    //     delay: 0,
    //     smooth: 'easeInOutQuart'
    //   });
    // }
  }

  render () {
    return (
      <Element name={`question-${this.props.questionID}`}>
        <PossibleAnswersContext.Consumer>
          {allPossibleAnswers =>
            (<Question possibleAnswers={allPossibleAnswers}
                       {...this.props} // questionIndex, questionText, isDisabled and selectedItemId
            />)}
        </PossibleAnswersContext.Consumer>
      </Element>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const { navigation, answeredQuestions } = state;
  const { questionText, questionID } = ownProps;

  // Compare the position in the state (current position) and the one of the question if provided
  // This will enable the questions that are in the current position
  const disabled = navigation.questionGlobalIndex === INDEX_NO_VALUE ||
    !(navigation.questionGlobalIndex === Number.parseInt(questionID));

  // If answer already there we just fetch it
  const selectedItemId = answeredQuestions.reduce(
    (value, answerItem) => (
      (answerItem.questionGlobalIndex === Number.parseInt(questionID)) ? answerItem.answerId : value),
    ANSWER_NOT_ANSWERED
  );

  return {
    ...ownProps,
    ...{ isDisabled: disabled, selectedItemId: selectedItemId }
  };
};

export default connect(mapStateToProps)(QuestionWrapper);

