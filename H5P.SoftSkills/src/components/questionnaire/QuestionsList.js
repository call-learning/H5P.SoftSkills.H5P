import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import React from 'react';
import Question from './Question';
import {
  questionsByCompetencyAndSubCompetencies, questionnaireCompetenciesQuestionsDefault,
} from '../../utils/CommonProptypes';
import PropTypes from 'prop-types';
import { getGlobalQuestionIndex } from '../../utils/ComponentsUtils';

function QuestionsList(props) {
  const QuestionWrapper = props.questionComponent;
  const currentCompetency = props.questionsByCompetencyAndSubCompetencies[props.competencyIndex];
  const compIndex = props.competencyIndex;
  return (<Box>
    {
      currentCompetency.subCompetencies.map((subCompetency, subCompetencyIndex) => (<Box key={`subcomp-${subCompetencyIndex}-${compIndex}`}>
        <Box>
          {
            (subCompetency.isVisible) ? <Typography variant="h3">{subCompetency.label}</Typography> : ''
          }
        </Box>
        <Box>
          {
            subCompetency.contexts.map(
              (context, contextIndex) =>
                (
                  <Box key={`context-${contextIndex}-${subCompetencyIndex}-${compIndex}`}>
                    <Box>
                      {
                        (context.isVisible) ? <Typography
                          variant="h4">{contextIndex + 1}. {context.label}</Typography> : ''
                      }
                    </Box>
                    <Box>
                      {
                        context.questions.map(
                          (questionLabel, questionIndex) => (<QuestionWrapper
                              key={`question-${questionIndex}-${contextIndex}-${subCompetencyIndex}-${compIndex}`}
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
                            />

                          )
                        )
                      }
                    </Box>
                  </Box>)
            )
          }
        </Box>
      </Box>))
    }
  </Box>);
}

QuestionsList.propTypes = Object.assign(
  {
    questionComponent: PropTypes.element,
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
