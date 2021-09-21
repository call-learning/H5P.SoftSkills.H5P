import PropTypes from 'prop-types';
import { questionnaireSettings } from '../utils/CommonProptypes';
import InstructionPage from '../components/pages/InstructionPage';
import { connect } from 'react-redux';
import { startQuestionnaireAndPosition } from '../actions/questionnaire';

const mapDispatchToProps = (dispatch) => {
  return {
    startQuestionnaire: (startAction) => dispatch(startQuestionnaireAndPosition(startAction))
  };
};

const InstructionPageContainer = connect(null,
  mapDispatchToProps
)(InstructionPage);

InstructionPageContainer.propTypes = {
  start: PropTypes.func,
  isReadyToStart: PropTypes.bool,
  ...questionnaireSettings
};

export default InstructionPageContainer;
