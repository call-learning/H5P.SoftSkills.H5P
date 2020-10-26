import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import SuccessImage from '../../../assets/success.svg';
import Typography from '@material-ui/core/Typography';
import H5PTranslatedText from '../../utils/H5PTranslatedText';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import StarsIcon from '@material-ui/icons/Stars';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { handleBadgeEmit } from '../../utils/ComponentsUtils';
import PropTypes from 'prop-types';

const DIALOG_TIMEOUT = 2000;

function ObtainBadgeDialog (props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [badgeGenerated, setbadgeGenerated] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleObtainBadge = (email) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Send the message and close the UI.
      setEmailError(false);
      // Emit the badge (Moodle Only)
      handleBadgeEmit(email,
        props.score,
        () => {
          setbadgeGenerated(
            <Typography align={'center'} color="primary"><H5PTranslatedText
              text="obtainbadgegenerationsuccess"/></Typography>);
          // eslint-disable-next-line no-undef
          setTimeout(() => handleClose(), DIALOG_TIMEOUT);

        }, (errorid) => {
          setbadgeGenerated(<Typography align={'center'} color="error"><H5PTranslatedText
            text="obtainbadgegenerationfailure" arguments={{ 'errorid': errorid }}/></Typography>);
        });
    } else {
      setEmailError(true);
    }
  };
  return (
    <div>
      <Button variant="contained"
              color="primary"
              startIcon={<StarsIcon/>}
              onClick={handleClickOpen}
              py={1}
      >
        <H5PTranslatedText text='obtainmybadge'/>
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="obtainmybadge-title">
        <DialogTitle id="obtainmybadge-title"><H5PTranslatedText text='obtainmybadge'/></DialogTitle>
        <DialogContent>
          <DialogContentText align={'center'}>
            <Box m={2}><img className="SuccessImage" src={SuccessImage} alt=""
                            role="presentation"/></Box>
            <Typography variant="h3"><H5PTranslatedText text="congratulations"/></Typography>
            <Typography align={'center'} color="secondary"><H5PTranslatedText
              text="badgecongratulationtext"/></Typography>
            {
              badgeGenerated ? badgeGenerated : ''
            }
          </DialogContentText>
          <InputLabel error={emailError} htmlFor="email">
            {
              emailError ?
                <H5PTranslatedText text="obtainbadgeemailerror"/> : <H5PTranslatedText
                  text="obtainbadgeemail"/>
            }
          </InputLabel>
          <Input id="email" labelaria-describedby="email-text" value={email} onChange={handleEmailChange}/>
          <FormHelperText id="email-text"><H5PTranslatedText text="obtainbadgeemaildesc"/></FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <H5PTranslatedText text='obtainmybadgecancel'/>
          </Button>
          <Button onClick={() => handleObtainBadge(email)} color="primary" variant="contained">
            <H5PTranslatedText text='obtainmybadgeproceed'/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
}

ObtainBadgeDialog.propTypes = {
  score: PropTypes.number
};
ObtainBadgeDialog.defaultProps = {
  score: -1
};

export default ObtainBadgeDialog;
