/**
 * Utility function to translate the path from an image path
 * @param filepath
 * @return {*}
 */
import socialImage from '../../assets/social.svg';
import personalImage from '../../assets/personal.svg';
import methodologicalImage from '../../assets/methodological.svg';

const DEFAULT_COMPETENCY_IMAGE = [socialImage, personalImage, methodologicalImage];

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

export function getProgressData(questionsByCompetencyAndSubCompetencies, answeredQuestion) {

  let allCompetenciesProgress = [];
  let answeredquestionCount = 0;
  for (let [competencyIndex, comp] of questionsByCompetencyAndSubCompetencies.entries()) {
    let currentCompetencyProgress = [];
    for (let [compSubIndex, compSub] of comp.subCompetencies.entries()) {
      const subCompTotalQuestions = compSub.contexts.reduce((acc, c) => (acc + c.questions.length), 0);
      const minQuestionIndexForSubComp =
        getGlobalQuestionIndex(questionsByCompetencyAndSubCompetencies, competencyIndex, compSubIndex, 0, 0);
      const subCompAnsweredQuestions = answeredQuestion.reduce((acc, a) => {
        const qi = a.questionGlobalIndex - minQuestionIndexForSubComp;
        return acc + ((qi >= 0 && qi < subCompTotalQuestions) ? 1 : 0);
      }, 0);
      answeredquestionCount += subCompAnsweredQuestions;
      currentCompetencyProgress.push(100 * subCompAnsweredQuestions / subCompTotalQuestions);
    }
    allCompetenciesProgress.push(currentCompetencyProgress);
  }
  return {
    totalAnsweredQuestions: answeredquestionCount,
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
 * @param questionsByCompetencyAndSubCompetencies
 * @return {*}
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
 * @return {[]}
 */
export function computeProgressPerCompetency (
  questionsByCompetencyAndSubCompetencies,
  answeredQuestions,
  possibleAnswers
) {
  let competenciesResults = [];
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
        value: 100 * currentsubCompetenciesResults / (subCompetencyQuestionsCount * maxPossibleAnswerValue),
        totalQuestions: subCompetencyQuestionsCount,
        totalAnswered: subCompetencyAnsweredCount
      });
      competencyAnsweredCount += subCompetencyAnsweredCount;
      competencyQuestionsCount += subCompetencyQuestionsCount;
    }
    const categoryResults = subCompetenciesResults.reduce((acc, subCompetencyval) => (acc + subCompetencyval.value), 0) / subCompetenciesResults.length;
    competenciesResults.push({
      label: comp.label,
      value: categoryResults,
      subCompetenciesResults: subCompetenciesResults,
      totalQuestions: competencyQuestionsCount,
      totalAnswered: competencyAnsweredCount
    });
  }
  return competenciesResults;
}

export function getRealValueFromPossibleValue (possibleAnswers, answerId) {
  const answer = possibleAnswers.find((answ) => answ.answerId === answerId);
  if (!answer || typeof answer.realValue === 'undefined') {
    return answerId;
  }
  return answer.realValue;
}

export function isUnknownValue (possibleAnswers, answerId) {
  const answer = possibleAnswers.find((answ) => answ.answerId === answerId);
  return answer && typeof answer.unknown !== 'undefined' && answer.unknown;
}

/**
 * Get a set of resources sorted by competency
 */
export function resourcesPerContext (resources, questionsByCompetencyAndSubCompetencies, competencyIndex, subCompetencyIndex) {
  // eslint-disable-next-line no-undef
  let rPC = new Map();
  for (let currentResource of resources) {
    const resourceRefs = currentResource.references.split(','); // Allrefs from this resource.
    for (let ref of resourceRefs) {
      const refSplit = ref.split(':');
      if (refSplit) {
        const [competencyId, subCompetencyId, contextId] = refSplit;
        // Add a stable ID
        const currentResourceWID = Object.assign({ id: stringToHashCode(currentResource.label) }, currentResource);
        if (rPC.has(contextId)) {
          let value = rPC.get(contextId);
          value.resources.push(currentResourceWID);
        } else {
          const contextLabel = questionsByCompetencyAndSubCompetencies[competencyId] &&
            questionsByCompetencyAndSubCompetencies[competencyId].subCompetencies[subCompetencyId] &&
            questionsByCompetencyAndSubCompetencies[competencyId].subCompetencies[subCompetencyId].contexts[contextId].label;
          if (contextLabel) {
            rPC.set(contextId, {
              id: `${competencyId}-${subCompetencyId}-${contextId}`,
              label: contextLabel,
              resources: [currentResourceWID]
            });
          }
        }
      }
    }
  }
  return Array.from(rPC.values());
}

export const stringToHashCode = function (s) {
  let hash = 0;
  if (!s.length) return hash;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return (hash>>>0).toString();
};

/**
 * For now just return something that can be used with
 * https://fr.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 */
export const resourceCreateMarkup = function (rawHTML) {
  return { __html: rawHTML };
};
