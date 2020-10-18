/**
 * Utility function to translate the path from an image path
 * @param filepath
 * @return {*}
 */
import socialImage from '../../assets/social.svg';
import personalImage from '../../assets/personal.svg';
import methodologicalImage from '../../assets/methodological.svg';

const DEFAULT_COMPETENCY_IMAGE = [socialImage, personalImage, methodologicalImage];

/**
 * Get default image for competency (it is modulo the number of expected competencies, i.e. 3)
 * @param competencyIndex
 */
export function getCompetencyImageFromIndex (competencyIndex) {
  return DEFAULT_COMPETENCY_IMAGE[competencyIndex % DEFAULT_COMPETENCY_IMAGE.length]; // DEFAULT image.
}

/**
 * Get progress information
 * @param questionsByCompetencyAndSubCompetencies
 * @param answeredQuestions
 * @return {{answeredQuestionsCount: number, questionsCount: number, competenciesProgress: []}}
 */
export function getProgressData (questionsByCompetencyAndSubCompetencies, answeredQuestions) {
  let allCompetenciesProgress = [];
  let answeredQuestionsCount = 0;
  let questionsCount = 0;
  for (let [competencyIndex, comp] of questionsByCompetencyAndSubCompetencies.entries()) {
    let compAnsweredQuestionsCount = 0;
    let compQuestionsCount = 0;
    for (let [compSubIndex, compSub] of comp.subCompetencies.entries()) {
      const subCompTotalQuestions = compSub.contexts.reduce((acc, c) => (acc + c.questions.length), 0);
      const minQuestionIndexForSubComp =
        getGlobalQuestionIndex(questionsByCompetencyAndSubCompetencies, competencyIndex, compSubIndex, 0, 0);
      const subCompAnsweredQuestions = answeredQuestions.reduce((acc, a) => {
        const qi = a.questionGlobalIndex - minQuestionIndexForSubComp;
        return acc + ((qi >= 0 && qi < subCompTotalQuestions) ? 1 : 0);
      }, 0);
      compAnsweredQuestionsCount += subCompAnsweredQuestions;
      compQuestionsCount += subCompTotalQuestions;
    }
    allCompetenciesProgress.push({
      answeredQuestionsCount: compAnsweredQuestionsCount,
      questionsCount: compQuestionsCount,
    });
    answeredQuestionsCount += compAnsweredQuestionsCount;
    questionsCount += compQuestionsCount;
  }
  return {
    answeredQuestionsCount: answeredQuestionsCount,
    questionsCount: questionsCount,
    competenciesProgress: allCompetenciesProgress
  };
}

/**
 * Get the total number of question in the full set
 * @param questionsByCompetencyAndSubCompetencies
 * @return {*}
 */
export function getTotalQuestionCount (questionsByCompetencyAndSubCompetencies) {
  let totalCount = 0;
  for (let comp of questionsByCompetencyAndSubCompetencies) {
    totalCount += getTotalQuestionCountCompetency(comp);
  }
  return totalCount;
}

/**
 * Get the total number of question in the full set
 * @return {*}
 * @param competencyQuestions
 */
export function getTotalQuestionCountCompetency (competencyQuestions) {
  let totalCount = 0;
  for (let subCompetency of competencyQuestions.subCompetencies) {
    for (let compContext of subCompetency.contexts) {
      totalCount += compContext.questions.length;
    }
  }
  return totalCount;
}

/**
 * Get the global index of the Question in the full set of questions
 * @param questionsByCompetencyAndSubCompetencies
 * @param competencyIndex
 * @param subCompetencyIndex
 * @param contextIndex
 * @param questionIndex
 * @return {*}
 */
export function getGlobalQuestionIndex (questionsByCompetencyAndSubCompetencies, competencyIndex, subCompetencyIndex, contextIndex, questionIndex) {
  let globalQuestionIndex = 0;
  let currentCompIndex = 0;
  let currentSubCompetencyIndex = 0;
  let currentContextIndex = 0;
  for (let comp of questionsByCompetencyAndSubCompetencies) {
    currentSubCompetencyIndex = 0;
    for (let compSub of comp.subCompetencies) {
      currentContextIndex = 0;
      for (let compContext of compSub.contexts) {
        const questionCount = compContext.questions.length;
        if (currentCompIndex === competencyIndex
          && currentSubCompetencyIndex === subCompetencyIndex
          && currentContextIndex === contextIndex) {
          if (questionIndex > questionCount) {
            return globalQuestionIndex + questionCount; // Here we cut off to the right number of questions
          }
          return globalQuestionIndex + questionIndex;
        }
        globalQuestionIndex += questionCount;
        currentContextIndex++;
      }
      currentSubCompetencyIndex++;
    }
    currentCompIndex++;
  }
  return globalQuestionIndex;
}

/**
 * Get index location of a component via its global question index
 * @param questionsByCompetencyAndSubCompetencies
 * @param questionGlobalIndex
 * @return {{}|{competencyIndex: *, questionIndex: *, contextIndex: number, subCompetencyIndex: *}}
 */
export function getComponentIndexesFromGlobalQuestionIndex (questionsByCompetencyAndSubCompetencies, questionGlobalIndex) {
  for (let [competencyIndex, comp] of questionsByCompetencyAndSubCompetencies.entries()) {
    for (let [compSubCompetencyIndex, compSub] of comp.subCompetencies.entries()) {
      for (let [compContextIndex, compContext] of compSub.contexts.entries()) {
        if (questionGlobalIndex < compContext.questions.length) {
          return {
            competencyIndex: competencyIndex,
            subCompetencyIndex: compSubCompetencyIndex,
            contextIndex: compContextIndex,
            questionIndex: questionGlobalIndex // What is left is the question index
          }; // We found it.
        }
        questionGlobalIndex -= compContext.questions.length;
      }
    }
  }
  return {};
}

// TODO CHANGE PossibleAnswer to settings

/**
 * Compute the progress per competency and subcompetency to display on the results page
 * @param questionsByCompetencyAndSubCompetencies
 * @param answeredQuestions
 * @param settings
 * @return Object
 */
export function computeProgressPerCompetency (
  questionsByCompetencyAndSubCompetencies,
  answeredQuestions,
  settings
) {
  const possibleAnswers = settings.possibleAnswers;
  let competenciesResults = [];
  let globalResult = 0, globalQuestionsCount = 0, globalAnsweredCount = 0;
  const maxPossibleAnswerValue = possibleAnswers.reduce((max, pa) => {
    const realValue = (typeof pa.realValue === 'undefined') ? pa.id : pa.realValue;
    return (realValue > max) ? realValue : max;
  }, 0);
  const indexedAnswers = getGloballyIndexedAnswerArray(answeredQuestions);

  let currentGlobalIndex = 0;
  for (let comp of questionsByCompetencyAndSubCompetencies) {
    let subCompetenciesResults = [];
    let competencyAnsweredCount = 0;
    let competencyQuestionsCount = 0;
    for (let SubCompetency of comp.subCompetencies) {
      let currentsubCompetenciesResults = 0;
      let subCompetencyQuestionsCount = 0;
      let subCompetencyAnsweredCount = 0;
      for (let compContext of SubCompetency.contexts) {
        for (let question of compContext.questions)  {
          if (typeof indexedAnswers[currentGlobalIndex] !== 'undefined') {
            currentsubCompetenciesResults += getRealValueFromPossibleValue(possibleAnswers,
              indexedAnswers[currentGlobalIndex].answerId);
            subCompetencyAnsweredCount += 1;
          }
          currentGlobalIndex += 1;
          subCompetencyQuestionsCount += 1;
        }
      }
      subCompetenciesResults.push({
        label: SubCompetency.label,
        value: Math.floor(100 * currentsubCompetenciesResults / (subCompetencyQuestionsCount * maxPossibleAnswerValue)),
        totalQuestions: subCompetencyQuestionsCount,
        totalAnswered: subCompetencyAnsweredCount
      });
      competencyAnsweredCount += subCompetencyAnsweredCount;
      competencyQuestionsCount += subCompetencyQuestionsCount;
    }
    const categoryResults = subCompetenciesResults.reduce((acc, subCompetencyval) => (acc + subCompetencyval.value), 0) / subCompetenciesResults.length;
    competenciesResults.push({
      label: comp.label,
      value: Math.floor(categoryResults),
      subCompetenciesResults: subCompetenciesResults,
      totalQuestions: competencyQuestionsCount,
      totalAnswered: competencyAnsweredCount
    });
    globalResult += categoryResults;
    globalQuestionsCount +=competencyQuestionsCount;
    globalAnsweredCount +=competencyAnsweredCount;
  }
  return {
    value: globalResult / questionsByCompetencyAndSubCompetencies.length,
    totalQuestions: globalQuestionsCount,
    totalAnswered: globalAnsweredCount,
    competenciesResults: competenciesResults
  };
}

// TODO ; clarify this: do we need a real value ???

/**
 * Get real value (i.e. answer.realValue if provided or just answerId if not)
 * @param possibleAnswers
 * @param answerId
 * @return {Requireable<number>|*}
 */
export function getRealValueFromPossibleValue (possibleAnswers, answerId) {
  const answer = possibleAnswers.find((answ) => answ.answerId === answerId);
  if (!answer || typeof answer.realValue === 'undefined') {
    return answerId;
  }
  return answer.realValue;
}

/**
 * Get Textual Value from Possible answer Id
 * @param possibleAnswers
 * @param answerId
 * @return {Requireable<number>|*}
 */
export function getTextValueFromPossibleValue (settings, questionData, answerId) {
  const answer = settings.possibleAnswers.find((answ) => answ.id === answerId);
  if (answer === undefined) {
    return '';
  }
  const answerIndex = settings.possibleAnswers.findIndex((answ) => answ.id === answerId);
  return typeof questionData.answerLabelsOverride != 'undefined' ?
    questionData.answerLabelsOverride[answerIndex] : answer.text;
}

/**
 * Check if an answer is acquired (in the sense that the user would deserve a badge)
 *
 * @param settings
 * @param questionData
 * @param answerId
 * @return {boolean}
 */
export function isAcquiredAnswer (settings, questionData, answerId) {
  // First find the identifier in the list of possible answers
  const answer = settings.possibleAnswers.find((answ) => answ.id === answerId);
  // Then check for the level of acquisition
  if (answer === undefined) {
    return false;
  }

  const levelOfAcquisition = acquisitionThreshold(settings, questionData)
  return answerId >= levelOfAcquisition;
}

/**
 * Check the acquisition threshold, i.e. the id of the answer that is considered
 * as acquired for the user. This can be set globally or at the individual question
 * level
 *
 * @param settings
 * @param questionData
 * @return {number|Requireable<number>}
 */
export function acquisitionThreshold (settings, questionData) {
  // First find the identifier in the list of possible answers
  return typeof questionData.acquisitionThreshold != 'undefined' ?
    questionData.acquisitionThreshold : settings.acquisitionThreshold;
}

/**
 * Are we considering that the user has fully acquired all competencies
 *
 * In order for this to be true:
 * * The user has to fill all the answers
 * * The answer must be in the "acquired" threshold
 *
 * @param questionsByCompetencyAndSubCompetencies
 * @param answeredQuestions
 * @param settings
 */
export function isFullyAcquired (questionsByCompetencyAndSubCompetencies,
                                 answeredQuestions,
                                 settings) {
  let currentGlobalIndex = 0;
  const indexedAnswers = getGloballyIndexedAnswerArray(answeredQuestions);
  for (let comp of questionsByCompetencyAndSubCompetencies) {
    for (let SubCompetency of comp.subCompetencies) {
      for (let compContext of SubCompetency.contexts) {
        for (let question of compContext.questions) {
          if (typeof indexedAnswers[currentGlobalIndex] === 'undefined') {
            return false; // No matching answer. Questionnaire is not finished.
          }
          if (!isAcquiredAnswer(settings, question, indexedAnswers[currentGlobalIndex].answerId)) {
            return false;  // The answer is not sufficient to mark it as acquired.
          }
          currentGlobalIndex += 1;
        }
      }
    }
  }
  return true;
}

/**
 * Reverse the array of answered questions so we can access them through the questionGlobalIndex
 *
 * @param answeredQuestions
 * @return {[]}
 */
export function getGloballyIndexedAnswerArray (answeredQuestions) {
  let answerIndexedArray = [];
  for (let answer of answeredQuestions) {
    answerIndexedArray[answer.questionGlobalIndex] = answer;
  }
  return answerIndexedArray;
}

// TODO Change from possibleAnswer to settings
/**
 * Check if the value is "I don't know" or not
 * @param possibleAnswers
 * @param answerId
 * @return {*|boolean}
 */
export function isUnknownValue (settings, answerId) {
  const answer = settings.possibleAnswers.find((answ) => answ.id === answerId);
  return Boolean(answer && (settings.unknownValueId === answerId)) ;
}

/**
 * Decompose a reference into subcomponents
 * @param ref
 * @return {[]}
 */
export function getContextFromReference (ref) {
  let allRefs = [];
  const resourceRefs = ref.split(','); // Allrefs from this resource.
  for (let ref of resourceRefs) {
    const refSplit = ref.split(':');
    if (refSplit) {
      let [competencyId, subCompetencyId, contextId] = refSplit;
      competencyId = parseInt(competencyId);
      subCompetencyId = parseInt(subCompetencyId);
      contextId = parseInt(contextId);
      if (!(isNaN(contextId) || isNaN(subCompetencyId) || isNaN(contextId))) {
        allRefs.push({
          competencyId: competencyId,
          subCompetencyId: subCompetencyId,
          contextId: contextId
        });
      }
    }
  }
  return allRefs;
}

/**
 * String to hashcode for unique id
 * @param s
 * @return {string|number}
 */
export const stringToHashCode = function (s) {
  let hash = 0;
  if (!s.length) return hash;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return (hash >>> 0).toString();
};

/**
 * For now just return something that can be used with
 * https://fr.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 */
export const resourceCreateMarkup = function (rawHTML) {
  return { __html: rawHTML };
};

const QUANTILES = [0, 25, 50, 75, 100];

/**
 * Get quantile from value (round to the previous quantile value)
 * @param valueToCheck
 * @return {number}
 */
export function getCurrentQuantile (valueToCheck) {
  return QUANTILES.reduce((quantileVal, quantileValue) =>
      (valueToCheck >= quantileValue ? quantileValue : quantileVal),
    0
  );
}

/**
 * Truncate label/string to max char
 * @param text
 * @param MAXCHAR
 * @return {*}
 */
export function truncateLabel (text, MAXCHAR) {
  return (text.length > MAXCHAR) ? text.substring(0, MAXCHAR) + '...' : text;
}

/**
 * Get subcompetencies context and attached resources
 * @param questionsByCompetencyAndSubCompetencies
 * @param answeredQuestion
 * @param resources
 * @param settings
 * @param competencyIndex
 * @param subCompetencyIndex
 * @return {[]}
 */
export function getSubCompetencyResultsAndResources (questionsByCompetencyAndSubCompetencies,
                                                     answeredQuestion,
                                                     resources,
                                                     settings,
                                                     competencyIndex,
                                                     subCompetencyIndex) {

  let resultsAndResources = [];

  const subCompetency = questionsByCompetencyAndSubCompetencies[competencyIndex].subCompetencies[subCompetencyIndex];
  for (let [contextIndex, context] of subCompetency.contexts.entries()) {
    const minQuestionIndexForContext =
      getGlobalQuestionIndex(questionsByCompetencyAndSubCompetencies, competencyIndex, subCompetencyIndex, contextIndex, 0);
    const contextTotalQuestionCount = context.questions.length;
    const contextTotalScore = answeredQuestion.reduce((acc, answer) => {
      const qi = answer.questionGlobalIndex - minQuestionIndexForContext;
      return acc + ((qi >= 0 && qi < contextTotalQuestionCount) ?
        getRealValueFromPossibleValue(settings.possibleAnswers, answer.answerId) : 0);
    }, 0);
    // Get cumulative acquisition Threshold
    const contextAcquiredValue =
      context.questions.reduce((acc, question) => (acc + acquisitionThreshold(settings, question)),0);
    const contextQA = answeredQuestion.reduce((acc, answer) => {
      const qi = answer.questionGlobalIndex - minQuestionIndexForContext;
      if (qi >= 0 && qi < contextTotalQuestionCount) {
        acc.push({
          questionData: context.questions[qi],
          questionGlobalIndex: answer.questionGlobalIndex,
          answer: answer.answerId
        });
      }
      return acc;
    }, []);

    const resourcesList = resources.reduce((acc, resource) => {
      const allrefs = getContextFromReference(resource.references);

      for (let ref of allrefs) {
        if (ref.competencyId === competencyIndex
          && ref.subCompetencyId === subCompetencyIndex
          && ref.contextId === contextIndex) {
          if (typeof ref.questionIndex != 'undefined') {
            // If resource is up to index we only display the resource if question has an answer greater than the
            // threshold.
            if ((context.questions.length > ref.questionIndex)){
              const question  = context.questions[ref.questionIndex];
              const hideResourceThreshold = typeof question.hideResourceThreshold === 'undefined' ?
                settings.hideResourceThreshold :  question.hideResourceThreshold;

              const questionGlobalIndex = getGlobalQuestionIndex(
                questionsByCompetencyAndSubCompetencies,
                competencyIndex,
                subCompetencyIndex,
                contextIndex,
                ref.questionIndex);
              const answeredQuestion = contextQA.find(
                (element) => (element.questionGlobalIndex === questionGlobalIndex)
              )
              if (answeredQuestion.answer > hideResourceThreshold) {
                continue; // We don't add the resource to the list as the user has answer correctly.
              }
            }
          }
          const currentResourceWID = Object.assign({ id: stringToHashCode(resource.content) }, resource);
          acc.set(contextIndex, currentResourceWID);
        }
      }
      return acc;
      // eslint-disable-next-line no-undef
    }, new Map());
    const resultValue = Math.floor(contextTotalScore / contextTotalQuestionCount);
    resultsAndResources.push({
      label: context.label,
      value: resultValue,
      contextAcquisitionThreshold: contextAcquiredValue,
      rawValue: contextTotalScore,
      questionsAnswers: contextQA,
      resources: Array.from(resourcesList.values())
    });
  }

  return resultsAndResources;
}

