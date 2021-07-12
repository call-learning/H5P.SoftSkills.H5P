import React from 'react';
import { Container, Radio, RadioGroup, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import {
  possibleAnswers,
  possibleAnswersDefault,
} from '../../utils/CommonProptypes';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { resourceCreateMarkup } from '../../utils/ComponentsUtils';

const useStyles = makeStyles(theme => ({
  roundedControl: {
    borderRadius: '4px',
    border: `solid 2px ${theme.palette.grey['400']}`,
    marginLeft: '2em',
    marginTop: '0.25em',
    marginBottom: '0.25em',
    padding: '0 1em',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  selectedControl: {
    border: `solid 2px ${theme.palette.primary.main}`,
  },
  checkboxLast: {
    display: 'block',
    textAlign: 'center',
    marginTop: '0.25em'
  },
  labelQuestion: {
    paddingBottom: '1em',
    textAlign: 'left',
    display: 'block',
    color: theme.palette.text.primary // Back to normal theme color.
  }

}));

const Question = (props) => {
  const classes = useStyles(props)

  // Deal with possible text override.
  const possibleAnswerArray = Array.from(props.possibleAnswers)
  const allRadioButtonsValues = props.answerLabelsOverride ?
    possibleAnswerArray.map(
      (val, index) => ({ text: props.answerLabelsOverride[index], id: val.id })
    ) : possibleAnswerArray

  const checkBoxValue = allRadioButtonsValues.pop() // The value for checkbox is the last one.

  const maxTextLength = allRadioButtonsValues.reduce(
    (maxLength, possibleValue) => (possibleValue.text.length > maxLength ? possibleValue.text.length : maxLength),
    0
  )

  const hSelect = (e, value) => {
    e.stopPropagation()
    props.handleSelectAnswer(
      props.questionID,
      value
    )
  }

  return (
    <Container disableGutters={true}>
      <FormControl component="fieldset" disabled={props.isDisabled} onClick={
        (e) => {
          if (props.isDisabled) {
            props.handleEnableQuestion(props.questionID)
          }
        }
      }>
        <FormLabel className={classes.labelQuestion} component="legend">
          <span dangerouslySetInnerHTML={resourceCreateMarkup(props.questionText)}/>
        </FormLabel>
        <RadioGroup row
                    defaultValue="top"
                    value={props.selectedItemId}
                    name={`${props.questionID}-radio`}
                    onChange={(e, value) => hSelect(e, parseInt(value))
                    }>
          {
            allRadioButtonsValues.map((e, index) => (
              <FormControlLabel style={{ minWidth: `${maxTextLength}ex` }} key={index}
                                className={`${classes.roundedControl} ${(props.selectedItemId === e.id) ? classes.selectedControl : ''}`}
                                value={e.id}
                                control={<Radio color="primary"
                                                checkedIcon={<CheckCircle/>}/>}
                                label={<span dangerouslySetInnerHTML={{ __html: e.text }}/>}
              />)
            )
          }
        </RadioGroup>
        <FormControlLabel
          checked={props.selectedItemId === checkBoxValue.id}
          className={classes.checkboxLast}
          value={checkBoxValue.id}
          control={<Checkbox color="primary"
                             className={`${(props.selectedItemId === checkBoxValue.id) ? classes.selectedControl : ''}`}/>}
          label={<span dangerouslySetInnerHTML={{ __html: checkBoxValue.text }}/>}
          onChange={(e, value) => hSelect(e, checkBoxValue.id)
          }
        />
      </FormControl>
    </Container>
  )
}

Question.propTypes = Object.assign({
    questionID: PropTypes.string, // Question identifier. Provided in the event as a unique id.
    selectedItemId: PropTypes.number,
    questionText: PropTypes.string,
    answerLabelsOverride: PropTypes.arrayOf(
      PropTypes.string
    ),
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
    answerLabelsOverride: null,
    isDisabled: false,
    handleEnableQuestion: () => null,
    handleSelectAnswer: () => null,
  },
  possibleAnswersDefault
);

export default Question;
