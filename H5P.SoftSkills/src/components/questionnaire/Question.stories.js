import React from 'react';

import { samplePossibleAnswers, SampleQuestionHandler, sampleQuestionText } from '../../utils/StoriesUtils';

export default { title: 'Questionnaire/Question' };

export const basicQuestion = () => <SampleQuestionHandler possibleAnswers={samplePossibleAnswers}/>;
export const disabledQuestion = () => <SampleQuestionHandler possibleAnswers={samplePossibleAnswers} isDisabled/>;
export const withLabelQuestion = () => <SampleQuestionHandler possibleAnswers={samplePossibleAnswers}
                                                              questionText={sampleQuestionText}/>;
export const disabledWithLabelQuestion = () => <SampleQuestionHandler possibleAnswers={samplePossibleAnswers}
                                                                      questionText={sampleQuestionText}
                                                                        isDisabled/>;

export const questionOverrideAnswerLabels = () => <SampleQuestionHandler possibleAnswers={samplePossibleAnswers}
                                                                      questionText={sampleQuestionText}
                                                                      answerLabelsOverride = {[
                                                                        "Tout à fait d'accord",
                                                                        "Plutôt d'accord",
                                                                        "D'accord",
                                                                        "Plutôt pas d'accord",
                                                                        "Pas d'accord"
                                                                      ]}/>;
