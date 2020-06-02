import React  from 'react';
import { connect } from 'react-redux';
import Question from '../components/questionnaire/Question';
import { PossibleAnswersContext } from '../contexts/PossibleAnswersContext';
import { ANSWER_NOT_ANSWERED, INDEX_NO_VALUE } from '../constants/QuestionnaireConstants';
import { Element, scroller } from 'react-scroll';

class QuestionWrapper extends React.Component {
  constructor (props) {
    super(props);
    this.state = {forceEnabled:false};
    this.elementRef = React.createRef();
    this.handleEnableQuestion = this.handleEnableQuestion.bind(this);
  }

  handleEnableQuestion (questionID) {
    this.setState((state, props) => ({ forceEnabled: true }));
  }
  componentDidMount () {
    if (!this.props.isDisabled) {
      scroller.scrollTo(`question-${this.props.questionID}`, {
        duration: 800,
        delay: 3,
        containerId:'competencyPageContainer',
        smooth: 'easeInOutQuart'
      });
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.isDisabled && !this.props.isDisabled) {
      scroller.scrollTo(`question-${this.props.questionID}`, {
         duration: 800,
         delay: 3,
        containerId:'competencyPageContainer',
        smooth: 'easeInOutQuart'
      });
    }
  }

  render () {
    let {isDisabled, ...otherprops} = this.props;
    if (this.state.forceEnabled) {
      isDisabled = false;
    }
    return (
      <Element name={`question-${this.props.questionID}`}>
        <PossibleAnswersContext.Consumer>
          {allPossibleAnswers =>
            (<Question possibleAnswers={allPossibleAnswers}
                       {...otherprops} isDisabled={isDisabled}
                       handleSelectAnswer={(questionID,value) => {
                         this.setState((state, props) => ({ forceEnabled: false }));
                         this.props.handleSelectAnswer(questionID, value);
                       }}
                       handleEnableQuestion={() => this.handleEnableQuestion()}
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

