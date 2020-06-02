import React from 'react';
import H5P from '../src/utils/H5P.mock';
import { sampleData, sampleAnswerData } from '../src/utils/StoriesUtils';
import { afterEach } from '@jest/globals';
import { cleanup, render } from '@testing-library/react';
import {
  computeProgressPerCompetency,
  getCompetencyImageFromIndex, getComponentIndexesFromGlobalQuestionIndex, getGlobalQuestionIndex,
  getProgressData, getRealValueFromPossibleValue,
  getTotalQuestionCount, getTotalQuestionCountCompetency, isUnknownValue, resourcesPerContext,
  stringToHashCode
} from '../src/utils/ComponentsUtils';

const smallerQuestionnaireData = {
  questionsByCompetencyAndSubCompetencies:
    sampleData.questionsByCompetencyAndSubCompetencies.map(
      (competency) => ({ ...competency, ...{ subCompetencies: competency.subCompetencies.splice(1) } })
    ),
  settings: sampleData.settings,
  resources: sampleData.resources,
};

afterEach(cleanup);

test('getCompetencyImageFromIndex from first competenty', () => {
  const image = getCompetencyImageFromIndex(1);
  expect(image.process()).toEqual({
    code: 'module.exports = ""' // This is because of jest stubbing here. But at least we check the function is ok.
  });
});

test('getProgressData Start of questionnaire', () => {
  expect(getProgressData(smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies, sampleAnswerData)).toEqual({
      "competenciesProgress": [
        [
          100
        ],
        [
          100,
          100,
          100,
          100
        ],
        [
          100,
          100,
          100,
          100
        ]
      ],
      "totalAnsweredQuestions": 51
    });
});

test('getTotalQuestionCount', () => {
  expect(getTotalQuestionCount(smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies)).toEqual(51);
});

test('getTotalQuestionCountCompetency', () => {
  expect(getTotalQuestionCountCompetency(smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies[0])).toEqual(11);
});

test('getGlobalQuestionIndex simple', () => {
  expect(getGlobalQuestionIndex(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    1,
    0,
    0,
    0
    )).toEqual(11);
});


test('getGlobalQuestionIndex next competency', () => {
  expect(getGlobalQuestionIndex(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    1,
    1,
    0,
    0
  )).toEqual(13);
});

test('getGlobalQuestionIndex wrong question index', () => {
  expect(getGlobalQuestionIndex(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    1,
    1,
    0,
    156
  )).toEqual(16);
});


test('getComponentIndexesFromGlobalQuestionIndex first question', () => {
  expect(getComponentIndexesFromGlobalQuestionIndex(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies, 1)).toEqual({
      competencyIndex: 0,
      subCompetencyIndex: 0,
      contextIndex: 0,
      questionIndex: 1
  });
});

test('getComponentIndexesFromGlobalQuestionIndex first competency', () => {
  expect(getComponentIndexesFromGlobalQuestionIndex(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies, 13)).toEqual({
    competencyIndex: 1,
    subCompetencyIndex: 1,
    contextIndex: 0,
    questionIndex: 0
  });
});

test('computeProgressPerCompetency', () => {
  expect(computeProgressPerCompetency(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    sampleAnswerData,
    smallerQuestionnaireData.settings.possibleAnswers)).toEqual(
    [
      {
        "label": "Compétences sociales",
        "subCompetenciesResults": [
          {
            "label": "Manager une équipe",
            "totalAnswered": 11,
            "totalQuestions": 11,
            "value": 61.81818181818182
          }
        ],
        "totalAnswered": 11,
        "totalQuestions": 11,
        "value": 61.81818181818182
      },
      {
        "label": "Compétences personnelles",
        "subCompetenciesResults": [
          {
            "label": "Adaptabilité",
            "totalAnswered": 2,
            "totalQuestions": 2,
            "value": 70
          },
          {
            "label": "Le leadership : un des leviers pour mener et conduire des individus ou des organisations",
            "totalAnswered": 3,
            "totalQuestions": 3,
            "value": 53.333333333333336
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
            "value": 70
          }
        ],
        "totalAnswered": 13,
        "totalQuestions": 13,
        "value": 63.333333333333336
      },
      {
        "label": "Compétences Méthodologiques",
        "subCompetenciesResults": [
          {
            "label": "Négocier",
            "totalAnswered": 5,
            "totalQuestions": 5,
            "value": 60
          },
          {
            "label": "Conduire un projet",
            "totalAnswered": 13,
            "totalQuestions": 13,
            "value": 64.61538461538461
          },
          {
            "label": "Résoudre un problème",
            "totalAnswered": 5,
            "totalQuestions": 5,
            "value": 56
          },
          {
            "label": "Faire preuve de créativité, chercher à innover et à entreprendre",
            "totalAnswered": 4,
            "totalQuestions": 4,
            "value": 55
          }
        ],
        "totalAnswered": 27,
        "totalQuestions": 27,
        "value": 58.90384615384615
      }
    ]
  );
});

test('getRealValueFromPossibleValue', () => {
  expect(getRealValueFromPossibleValue(smallerQuestionnaireData.settings.possibleAnswers, 1)).toEqual(1);
});

test('isUnknownValue', () => {
  expect(isUnknownValue(smallerQuestionnaireData.settings.possibleAnswers, 1)).toBeFalsy();
});

test('resourcesPerContext', () => {
  const expectedContent = {
    "id": "0-0-2",
    "label": {
      "label": "En tant que manager d’équipe, une de mes missions est la prévention des tensions et conflits",
      "isVisible": true,
      "questions": [
        "Je sais repérer les signaux faibles pour déterminer les situations de malaise.",
        "Je sais mettre en place un plan de prévention pour éviter les tensions et les conflits."
      ]
    },
    "resources": [
      {
        "id": "2401563827",
        "label": "J'utilise un correcteur orthographique",
        "content": "<p>My content <a href=\"http://google.com\" target=\"_blank\">www.google.com</a></p>\n",
        "references": "0:1:1,0:0:2"
      },
      {
        "id": "3470712089",
        "label": "Je relis ou je fais relire mes productions pour corriger les fautes d'orthographe",
        "content": "<p>My content <a href=\"http://google.com\" target=\"_blank\">www.google.com</a></p>\n",
        "references": "0:1:2,0:1:1"
      },
      {
        "id": "2629641163",
        "label": "Lorsque je considère nécessaire",
        "content": "<p>My content <a href=\"http://google.com\" target=\"_blank\">www.google.com</a></p>\n",
        "references": "0:1:2,0:1:2"
      },
      {
        "id": "2629641163",
        "label": "Lorsque je considère nécessaire",
        "content": "<p>My content <a href=\"http://google.com\" target=\"_blank\">www.google.com</a></p>\n",
        "references": "0:1:2,0:1:2"
      },
      {
        "id": "687260207",
        "label": "J'applique les règles",
        "content": "<p>My content <a href=\"http://google.com\" target=\"_blank\">www.google.com</a></p>\n",
        "references": "0:1:0,0:1:2"
      }
    ]
  };

  expect(resourcesPerContext(
    smallerQuestionnaireData.resources,
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    0,
    1)).toContainEqual(expectedContent);
});

test('stringToHashCode', () => {
  expect(stringToHashCode('ABCDEFJGIJKL')).toEqual('2708334370');
  expect(stringToHashCode('ABCDEFJGIJKL')).toEqual('2708334370');
  expect(stringToHashCode('ABCDEFJGIJKLA')).toEqual('2353986911');
});




