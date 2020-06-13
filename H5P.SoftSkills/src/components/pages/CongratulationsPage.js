import React from 'react';
import { Container, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import SuccessImage from '../../../assets/success.svg';
import Typography from '@material-ui/core/Typography';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import NavigationButton from '../elements/NavigationButton';

function CongratulationsPage (props) {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"100%"}>

        <Box m={2}><img className="SuccessImage" src={SuccessImage} alt=""
                  role="presentation"/></Box>
        <Typography variant="h3"><H5PTranslatedText text="congratulations"/></Typography>
        <Box my={2}>
          <Typography align={'center'} color="secondary"><H5PTranslatedText text="congratulationtext"/></Typography>
        </Box>
        <Box my={2}>
          <NavigationButton isNext
                            onClick={props.handleViewResultsClick}><H5PTranslatedText
            text="seeresults"/></NavigationButton>
        </Box>
      </Box>
    </Container>);
}

CongratulationsPage.propTypes = {
  onClick: PropTypes.func,
  isNext: PropTypes.bool,
  isBack: PropTypes.bool,
};
CongratulationsPage.defaultProps = {
  onClick: () => null,
  isNext: false,
  isBack: false,
};

export default CongratulationsPage;
