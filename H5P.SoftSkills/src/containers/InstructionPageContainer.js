import PropTypes from 'prop-types';
import { questionnaireSettings } from '../utils/CommonProptypes';
import InstructionPage from '../components/pages/InstructionPage';
import { connect } from 'react-redux';
import { startQuestionnaireAndPosition } from '../actions/questionnaire';


const mapDispatchToProps = (dispatch) => {
  return {
    startQuestionnaire: () => dispatch(startQuestionnaireAndPosition())
  }
}

const InstructionPageContainer = connect(null,
  mapDispatchToProps
)(InstructionPage)

InstructionPageContainer.propTypes =  Object.assign(
  {},
  {
    start: PropTypes.func
  },
  questionnaireSettings
);

export default InstructionPageContainer;
