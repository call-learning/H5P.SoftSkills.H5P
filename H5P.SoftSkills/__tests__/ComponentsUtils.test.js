import React from 'react';
import { sampleData, sampleAnswerData } from '../src/utils/StoriesUtils';
import { afterEach } from '@jest/globals';
import { cleanup } from '@testing-library/react';
import {
  computeProgressPerCompetency,
  getCompetencyImageFromIndex,
  getComponentIndexesFromGlobalQuestionIndex,
  getContextFromReference,
  getCurrentQuantile,
  getGlobalQuestionIndex,
  getProgressData,
  getRealValueFromPossibleValue, getSubCompetencyResultsAndResources, getTextValueFromPossibleValue,
  getTotalQuestionCount,
  getTotalQuestionCountCompetency, isAcquiredAnswer,
  isUnknownValue,
  stringToHashCode,
  truncateLabel
} from '../src/utils/ComponentsUtils';

afterEach(cleanup);

test('getCompetencyImageFromIndex from first competenty', () => {
  const image = getCompetencyImageFromIndex(1);
  expect(image.process()).toEqual({
    code: 'module.exports = ""' // This is because of jest stubbing here. But at least we check the function is ok.
  });
});

test('getProgressData Start of questionnaire', () => {
  expect(getProgressData(sampleData.questionsByCompetencyAndSubCompetencies, sampleAnswerData)).toEqual({
    "answeredQuestionsCount": 67,
    "competenciesProgress": [
      {
        "answeredQuestionsCount": 27,
        "questionsCount": 27
      },
      {
        "answeredQuestionsCount": 11,
        "questionsCount": 11
      },
      {
        "answeredQuestionsCount": 29,
        "questionsCount": 29
      }
    ],
    "questionsCount": 67
  });
});

test('getTotalQuestionCount', () => {
  expect(getTotalQuestionCount(sampleData.questionsByCompetencyAndSubCompetencies)).toEqual(67);
});

test('getTotalQuestionCountCompetency', () => {
  expect(getTotalQuestionCountCompetency(sampleData.questionsByCompetencyAndSubCompetencies[0])).toEqual(27);
});

test('getGlobalQuestionIndex simple', () => {
  expect(getGlobalQuestionIndex(
    sampleData.questionsByCompetencyAndSubCompetencies,
    1,
    0,
    0,
    0
  )).toEqual(27);
});

test('getGlobalQuestionIndex next competency', () => {
  expect(getGlobalQuestionIndex(
    sampleData.questionsByCompetencyAndSubCompetencies,
    1,
    1,
    0,
    0
  )).toEqual(30);
});

test('getGlobalQuestionIndex wrong question index', () => {
  expect(getGlobalQuestionIndex(
    sampleData.questionsByCompetencyAndSubCompetencies,
    1,
    1,
    0,
    156
  )).toEqual(34);
});

test('getComponentIndexesFromGlobalQuestionIndex first question', () => {
  expect(getComponentIndexesFromGlobalQuestionIndex(
    sampleData.questionsByCompetencyAndSubCompetencies, 1)).toEqual({
    competencyIndex: 0,
    subCompetencyIndex: 0,
    contextIndex: 0,
    questionIndex: 1
  });
});

test('getComponentIndexesFromGlobalQuestionIndex first competency', () => {
  expect(getComponentIndexesFromGlobalQuestionIndex(
    sampleData.questionsByCompetencyAndSubCompetencies, 30)).toEqual({
    competencyIndex: 1,
    subCompetencyIndex: 1,
    contextIndex: 0,
    questionIndex: 0
  });
});

test('computeProgressPerCompetency', () => {
  expect(computeProgressPerCompetency(
    sampleData.questionsByCompetencyAndSubCompetencies,
    sampleAnswerData,
    sampleData.settings)).toEqual(
    {
      "competenciesResults": [
        {
          "label": "Compétences Sociales",
          "subCompetenciesResults": [
            {
              "label": "Communiquer pour transmettre des idées et des informations nécessaires au travail",
              "totalAnswered": 11,
              "totalQuestions": 11,
              "value": 70
            },
            {
              "label": "Manager une équipe",
              "totalAnswered": 11,
              "totalQuestions": 11,
              "value": 61
            },
            {
              "label": "Le leadership: un des leviers pour mener et conduire des individus ou des organisations",
              "totalAnswered": 3,
              "totalQuestions": 3,
              "value": 66
            },
            {
              "label": "S'adapter",
              "totalAnswered": 2,
              "totalQuestions": 2,
              "value": 80
            }
          ],
          "totalAnswered": 27,
          "totalQuestions": 27,
          "value": 69
        },
        {
          "label": "Compétences Personnelles",
          "subCompetenciesResults": [
            {
              "label": "Identification des apprentissages liés à mon activité professionnelle",
              "totalAnswered": 3,
              "totalQuestions": 3,
              "value": 80
            },
            {
              "label": "L’éthique",
              "totalAnswered": 4,
              "totalQuestions": 4,
              "value": 60
            },
            {
              "label": "L’esprit critique",
              "totalAnswered": 4,
              "totalQuestions": 4,
              "value": 60
            }
          ],
          "totalAnswered": 11,
          "totalQuestions": 11,
          "value": 66
        },
        {
          "label": "Compétences Méthodologiques",
          "subCompetenciesResults": [
            {
              "label": "Se tenir au courant des nouvelles technologies et de nouveaux développements",
              "totalAnswered": 2,
              "totalQuestions": 2,
              "value": 80
            },
            {
              "label": "Négocier",
              "totalAnswered": 5,
              "totalQuestions": 5,
              "value": 72
            },
            {
              "label": "Conduire un projet",
              "totalAnswered": 13,
              "totalQuestions": 13,
              "value": 63
            },
            {
              "label": "Résoudre un problème",
              "totalAnswered": 5,
              "totalQuestions": 5,
              "value": 72
            },
            {
              "label": "Faire preuve de créativité, chercher à innover et à entreprendre",
              "totalAnswered": 4,
              "totalQuestions": 4,
              "value": 70
            }
          ],
          "totalAnswered": 29,
          "totalQuestions": 29,
          "value": 71
        }
      ],
      "totalAnswered": 67,
      "totalQuestions": 67,
      "value": 69.10555555555557
    }
  )
  ;
})
;

test('getRealValueFromPossibleValue', () => {
  expect(getRealValueFromPossibleValue(sampleData.settings.possibleAnswers, 1)).toEqual(1);
});

test('isUnknownValue', () => {
  expect(isUnknownValue(sampleData.settings, 1)).toBeTruthy();
  expect(isUnknownValue(sampleData.settings, 2)).toBeFalsy();
  expect(isUnknownValue(sampleData.settings, 60)).toBeFalsy();
});

test('getSubCompetencyResultsAndResources', () => {
  const expectedResults =
    {
      "label": "Je suis amené(e) à rédiger un document écrit dans une situation professionnelle précise:",
      "questionsAnswers": [
        {
          "answer": 5,
          "questionData": {
            "acquisitionThreshold": 5,
            "label": "Lors de la rédaction, je prends en considération mon public cible et j’adapte mon langage."
          },
          "questionGlobalIndex": 0
        },
        {
          "answer": 3,
          "questionData": {
            "label": "Je choisis le format et j’adapte mon registre à la situation (rapport, power point, mail, lettre interne, note de service, réseau social interne)."
          },
          "questionGlobalIndex": 1
        }
      ],
      "resources": [
        {
          "content": "<p>Bref récapitulatif des règles de caractéristique de l’écrit professionnel par un enseignant du CNED, Claude Terrier.  \nVoir spécifiquement la partie D5 «Communication» point 1 «Enjeux et concepts de base». Le site propose des exercices avec leurs corrigés.<a href=\"http://www.bts-g-pme.com/\" target=\"_blank\">http://www.bts-g-pme.com/</a></p>",
          "id": "2315897904",
          "references": "0:0:0:1",
          "type": "document"
        }
      ],
      "value": 4
    };

  expect(getSubCompetencyResultsAndResources(
    sampleData.questionsByCompetencyAndSubCompetencies,
    sampleAnswerData,
    sampleData.resources,
    sampleData.settings,
    0,
    0)).toContainEqual(expectedResults);
});

test('stringToHashCode', () => {
  expect(stringToHashCode('ABCDEFJGIJKL')).toEqual('2708334370');
  expect(stringToHashCode('ABCDEFJGIJKL')).toEqual('2708334370');
  expect(stringToHashCode('ABCDEFJGIJKLA')).toEqual('2353986911');
});

test('getCurrentQuantile', () => {
  expect(getCurrentQuantile(0)).toEqual(0);
  expect(getCurrentQuantile(25)).toEqual(25);
  expect(getCurrentQuantile(26)).toEqual(25);
  expect(getCurrentQuantile(80)).toEqual(75);
  expect(getCurrentQuantile(100)).toEqual(100);
});

test('truncateLabel', () => {
  const label20 = '1234567891234567891';
  expect(truncateLabel(label20, 10)).toEqual('1234567891...');
  expect(truncateLabel(label20, 50)).toEqual(label20);
});

test('getContextFromReference', () => {
  const ref = '1:2:3,3:4:5,A&b';
  expect(getContextFromReference(ref)).toEqual([
    {
      competencyId: 1,
      subCompetencyId: 2,
      contextId: 3
    },
    {
      competencyId: 3,
      subCompetencyId: 4,
      contextId: 5
    }
  ]);
});

test('getTextValueFromPossibleValue', () => {
  const answerOverride = [
    'Tout à fait d\'accord',
    'Plutôt d\'accord',
    'D\'accord',
    'Plutôt pas d\'accord',
    'Pas d\'accord'
  ];
  const sampleQuestionData = { 'label': 'Test question' };

  expect(getTextValueFromPossibleValue(sampleData.settings, sampleQuestionData, 3)).toEqual('Parfois');
  expect(getTextValueFromPossibleValue(sampleData.settings, sampleQuestionData, 2)).toEqual('Jamais');
  expect(getTextValueFromPossibleValue(sampleData.settings, sampleQuestionData, 50)).toEqual('');
  expect(getTextValueFromPossibleValue(sampleData.settings,
    { 'label': 'Test question', 'answerLabelsOverride': answerOverride }, 1)).toEqual('Pas d\'accord');
  expect(getTextValueFromPossibleValue(sampleData.settings,
    { 'label': 'Test question', 'answerLabelsOverride': answerOverride }, 5)).toEqual('Tout à fait d\'accord');
});

test('isAcquiredAnswer', () => {
  const sampleQuestionData = { 'label': 'Test question' };
  const modifiedQuestionData = { 'label': 'Test question', 'acquisitionThreshold': 2 };
  expect(isAcquiredAnswer(sampleData.settings, sampleQuestionData, 5)).toEqual(true);
  expect(isAcquiredAnswer(sampleData.settings, sampleQuestionData, 4)).toEqual(true);
  expect(isAcquiredAnswer(sampleData.settings, sampleQuestionData, 3)).toEqual(false);
  expect(isAcquiredAnswer(sampleData.settings, modifiedQuestionData, 3)).toEqual(true);
  expect(isAcquiredAnswer(sampleData.settings, modifiedQuestionData, 2)).toEqual(true);
  expect(isAcquiredAnswer(sampleData.settings, modifiedQuestionData, 1)).toEqual(false);

});

