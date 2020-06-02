import { connect } from 'react-redux';
import { reviewQuestionnaire } from '../actions/questionnaire';
import CongratulationsPage from '../components/pages/CongratulationsPage';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleViewResultsClick: () => dispatch(reviewQuestionnaire())
  }
}

const CongratulationsPageContainer = connect(null,
  mapDispatchToProps
)(CongratulationsPage)

export default CongratulationsPageContainer;
