import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Question from './Question';
import {
  questionsByCompetencyAndSubCompetencies, questionnaireCompetenciesQuestionsDefault,
} from '../../utils/CommonProptypes';
import { getGlobalQuestionIndex } from '../../utils/ComponentsUtils';


const useStyles = makeStyles(theme => ({
  contextLabel: {
    fontSize: 'larger'
  },
  listContainer: {
    listStyleType: 'none',
    marginTop: '3em',
    marginBottom: '3em',
    [theme.breakpoints.down('xs')]: {
      paddingInlineStart: '0px',
    },
  },
  subCompetencyListItem: {
    counterReset: 'context question'
  },
  contextListItem: {
    counterIncrement: 'context',
    '&.visible p::before': {
      content: 'counter(context) ". "'
    },
    '&.visible': {
      counterReset: 'question'
    }
  },
  questionListItem: {
    // counterIncrement: 'question',
    // '& legend::before': {
    //   content: 'counter(context) "." counter(question, lower-alpha) ")"'
    // },
    marginTop: '1em',
    marginBottom: '2em'
  },

}));

const QuestionsList = (props) => {
  const classes = useStyles(props);
  const QuestionWrapper = props.questionComponent;
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
  const compIndex = props.competencyIndex;
  return (<Box>
    {
      currentCompetency.subCompetencies.map((subCompetency, subCompetencyIndex) => (
        <ol key={`subcomp-${subCompetencyIndex}-${compIndex}`}
            className={`${classes.listContainer}`}>
          <li className={classes.subCompetencyListItem}>
            {
              (subCompetency.isVisible) ?
                <Typography variant="h4">
                  {<span dangerouslySetInnerHTML={{__html:subCompetency.label}}/>}
                  </Typography> : ''
            }
            <ol className={classes.listContainer}>
              {
                subCompetency.contexts.map(
                  (context, contextIndex) =>
                    (
                      <li className={`${classes.contextListItem} ${context.isVisible ? 'visible' : ''}`}
                          key={`context-${contextIndex}-${subCompetencyIndex}-${compIndex}`}>
                        {
                          (context.isVisible) ? <Typography
                            className={classes.contextLabel}>
                            {<span dangerouslySetInnerHTML={{__html:context.label}}/>}</Typography> : ''
                        }
                        <ol className={classes.listContainer}>
                          {
                            context.questions.map(
                              (question, questionIndex) => (
                                <li
                                  className={`${classes.questionListItem} ${context.isVisible ? 'contextVisible' : ''}`}
                                  key={`question-${contextIndex}-${subCompetencyIndex}-${compIndex}-${questionIndex}`}>
                                  <QuestionWrapper
                                    className={classes.questionListText}
                                    key={`question-${questionIndex}-${contextIndex}-${subCompetencyIndex}-${compIndex}-${questionIndex}`}
                                    questionID={getGlobalQuestionIndex(
                                      props.questionsByCompetencyAndSubCompetencies,
                                      props.competencyIndex,
                                      subCompetencyIndex,
                                      contextIndex,
                                      questionIndex
                                    ).toString()}
                                    firstQuestionFromCategory={subCompetencyIndex === 0 && contextIndex === 0 && questionIndex === 0}
                                    questionText={question.label}
                                    answerLabelsOverride={typeof question.answerLabelsOverride == 'undefined' ?
                                      undefined : question.answerLabelsOverride}
                                    handleEnableQuestion={props.handleEnableQuestion}
                                    handleSelectAnswer={props.handleSelectAnswer}
                                  /></li>))
                          }
                        </ol>
                      </li>)
                )
              }
            </ol>
          </li>
        </ol>))
    }
  </Box>);
};

QuestionsList.propTypes = Object.assign(
  {
    questionComponent: PropTypes.elementType,
    competencyIndex: PropTypes.number,
    answerLabelsOverride: PropTypes.arrayOf(
      PropTypes.string
    ),
    handleEnableQuestion: PropTypes.func,
    handleSelectAnswer: PropTypes.func,
  },
  questionsByCompetencyAndSubCompetencies,
);

QuestionsList.defaultProps = Object.assign(
  {
    questionComponent: Question,
    competencyIndex: 0,
    answerLabelsOverride: null
  },
  questionnaireCompetenciesQuestionsDefault,
);

export default QuestionsList;
