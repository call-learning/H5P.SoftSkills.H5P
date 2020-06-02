import React from 'react';
import { Container, Radio, RadioGroup, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import {
  possibleAnswers,
  possibleAnswersDefault,
} from '../../utils/CommonProptypes';
import CheckCircle from '@material-ui/icons/CheckCircle';

const styles = theme => ({
  roundedControl: {
    borderRadius: '4px',
    border: `solid 2px ${theme.palette.grey['400']}`,
    marginLeft: '2em',
    padding: '0 30px',
  },
  selectedControl: {
    border: `solid 2px ${theme.palette.primary.main}`,
  },
  checkboxLast: {
    display: 'block',
    textAlign: 'center',
  },
  labelQuestion: {
    paddingBottom: '1em',
    textAlign: 'center',
    display: 'block',
    color: theme.palette.text.primary // Back to normal theme color.
  }

});

const Question = withStyles(styles)((props) => {
  const { classes } = props;
  let allRadioButtonsValues = Array.from(props.possibleAnswers);
  const checkBoxValue = allRadioButtonsValues.pop(); // The value for checkbox is the last one.
  const hSelect = (e, value) => {
    e.stopPropagation();
    props.handleSelectAnswer(
      props.questionID,
      value
    );
  };
  return (
    <Container>
      <FormControl component="fieldset" disabled={props.isDisabled} onClick={
        (e) => props.handleEnableQuestion(props.questionID)
      }>
        <FormLabel className={classes.labelQuestion} component="legend">{props.questionText}</FormLabel>
        <RadioGroup row
                    defaultValue="top"
                    value={props.selectedItemId}
                    onChange={(e, value) => hSelect(e, parseInt(value))
                    }>
          {
            allRadioButtonsValues.map((e, index) => (
              <FormControlLabel key={index}
                                className={`${classes.roundedControl} ${(props.selectedItemId == e.id) ? classes.selectedControl : ''}`}
                                value={e.id}
                                control={<Radio color="primary"
                                                checkedIcon={<CheckCircle/>}/>}
                                label={e.text}
              />)
            )
          }
        </RadioGroup>
        <FormControlLabel checked={props.selectedItemId === checkBoxValue.id}
                          className={classes.checkboxLast}
                          value={checkBoxValue.id}
                          control={<Checkbox color="primary"/>}
                          label={checkBoxValue.text}
                          onChange={(e, value) => hSelect(e, checkBoxValue.id)
                          }
        />
      </FormControl>
    </Container>
  );
});

Question.propTypes = Object.assign({
    questionID: PropTypes.string, // Question identifier. Provided in the event as a unique id.
    selectedItemId: PropTypes.number,
    questionText: PropTypes.string,
    isDisabled: PropTypes.bool,
    handleEnableQuestion: PropTypes.func,
    handleSelectAnswer: PropTypes.func
  },
  possibleAnswers,
);

Question.defaultProps = Object.assign({
    questionID: '', // Question identifier is empty.
    selectedItemId: 0,
    questionText: '',
    isDisabled: false,
    handleEnableQuestion: (qid) => null,
    handleSelectAnswer: (quid, val) => null,
  },
  possibleAnswersDefault
);

export default Question;
