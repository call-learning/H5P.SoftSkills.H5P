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

export function getRealImagePath (filepath, contentId, libraryName) {
  const specialArchivePrefix = 'assets/';
  let imagePath = filepath;
  if (typeof H5P !== 'undefined' && H5P.getLibraryPath && H5P.getPath) {
    if (!imagePath.startsWith(specialArchivePrefix) && contentId) {
      imagePath = H5P.getPath(imagePath, contentId);
    } else if (libraryName) {
      imagePath = H5P.getLibraryPath(libraryName) + '/' + filePath;
    }

  }
  return imagePath;
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

/**
 * Compute the progress per competency and subcompetency to display on the results page
 * @param questionsByCompetencyAndSubCompetencies
 * @param answeredQuestions
 * @param possibleAnswers
 * @return Object
 */
export function computeProgressPerCompetency (
  questionsByCompetencyAndSubCompetencies,
  answeredQuestions,
  possibleAnswers
) {
  let competenciesResults = [];
  let globalResult = 0, globalQuestionsCount = 0, globalAnsweredCount = 0;
  const maxPossibleAnswerValue = possibleAnswers.reduce((max, pa) => {
    const realValue = (typeof pa.realValue === 'undefined') ? pa.id : pa.realValue;
    return (realValue > max) ? realValue : max;
  }, 0);

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
        const maxGlobalIndex = currentGlobalIndex + compContext.questions.length;
        for (let answer of answeredQuestions) {
          if (answer.questionGlobalIndex < maxGlobalIndex && answer.questionGlobalIndex >= currentGlobalIndex) {
            currentsubCompetenciesResults += getRealValueFromPossibleValue(possibleAnswers, answer.answerId);
            subCompetencyAnsweredCount += isUnknownValue(possibleAnswers, answer.answerId) ? 0 : 1;
          }
        }
        currentGlobalIndex += compContext.questions.length;
        subCompetencyQuestionsCount += compContext.questions.length;
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
    globalQuestionsCount = +competencyQuestionsCount;
    globalAnsweredCount = +competencyAnsweredCount;
  }
  return {
    value: globalResult / questionsByCompetencyAndSubCompetencies.length,
    totalQuestions: globalQuestionsCount,
    totalAnswered: globalAnsweredCount,
    competenciesResults: competenciesResults
  };
}

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
export function getTextValueFromPossibleValue (possibleAnswers, answerId) {
  const answer = possibleAnswers.find((answ) => answ.id === answerId);
  return answer ? answer.text : '';
}

export function isAcquiredAnswer (possibleAnswers, answerId) {
  const answer = possibleAnswers.find((answ) => answ.id === answerId);
  return answer && answer.isAcquired;
}

/**
 * Check if the value is "I don't know" or not
 * @param possibleAnswers
 * @param answerId
 * @return {*|boolean}
 */
export function isUnknownValue (possibleAnswers, answerId) {
  const answer = possibleAnswers.find((answ) => answ.answerId === answerId);
  return answer && typeof answer.unknown !== 'undefined' && answer.unknown;
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
 * @param possibleAnswers
 * @param competencyIndex
 * @param subCompetencyIndex
 * @return {[]}
 */
export function getSubCompetencyResultsAndResources (questionsByCompetencyAndSubCompetencies,
                                                     answeredQuestion,
                                                     resources,
                                                     possibleAnswers,
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
        getRealValueFromPossibleValue(possibleAnswers, answer.answerId) : 0);
    }, 0);
    const contextQA = answeredQuestion.reduce((acc, answer) => {
      const qi = answer.questionGlobalIndex - minQuestionIndexForContext;
      if (qi >= 0 && qi < contextTotalQuestionCount) {
        acc.push({
          label: context.questions[qi],
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
          const currentResourceWID = Object.assign({ id: stringToHashCode(resource.content) }, resource);
          acc.set(contextIndex, currentResourceWID);
        }
      }
      return acc;
      // eslint-disable-next-line no-undef
    }, new Map());
    resultsAndResources.push({
      label: context.label,
      value: Math.floor(contextTotalScore / contextTotalQuestionCount),
      questionsAnswers: contextQA,
      resources: Array.from(resourcesList.values())
    });
  }

  return resultsAndResources;
}

