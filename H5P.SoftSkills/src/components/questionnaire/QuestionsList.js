import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import React from 'react';
import Question from './Question';
import {
  questionsByCompetencyAndSubCompetencies, questionnaireCompetenciesQuestionsDefault,
} from '../../utils/CommonProptypes';
import PropTypes from 'prop-types';
import { getGlobalQuestionIndex } from '../../utils/ComponentsUtils';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  subCompetencyLabel: {
    fontSize: 'large',
    fontWeight: 'bold'
  },
  contextLabel: {
    fontSize: 'larger'
  },
  listContainer: {
    listStyleType: 'none',
    margin: "3em auto 3em 1em",
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
    counterIncrement: 'question',
    '& legend::before': {
      content: 'counter(context) "." counter(question, lower-alpha) " "'
    },
    margin: "1em auto 2em"
  },

});

const QuestionsList = withStyles(styles)((props) => {
  const { classes } = props;
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
                <Typography
                  className={classes.subCompetencyLabel}>{subCompetency.label}</Typography> : ''
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
                            className={classes.contextLabel}>{context.label}</Typography>: ''
                        }
                        <ol className={classes.listContainer}>
                          {
                            context.questions.map(
                              (questionLabel, questionIndex) => (
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
                                    questionText={questionLabel}
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
});

QuestionsList.propTypes = Object.assign(
  {
    questionComponent: PropTypes.elementType,
    competencyIndex: PropTypes.number,
    handleEnableQuestion: PropTypes.func,
    handleSelectAnswer: PropTypes.func,
  },
  questionsByCompetencyAndSubCompetencies,
);

QuestionsList.defaultProps = Object.assign(
  {
    questionComponent: Question,
    competencyIndex: 0,
    handleEnableQuestion: (qid) => null,
    handleSelectAnswer: (quid, val) => null,
  },
  questionnaireCompetenciesQuestionsDefault,
);

export default QuestionsList;
