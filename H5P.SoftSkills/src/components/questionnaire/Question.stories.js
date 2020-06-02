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

