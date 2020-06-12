import React from 'react';
import H5P from '../src/utils/H5P.mock';
import { sampleData, sampleAnswerData } from '../src/utils/StoriesUtils';
import { afterEach } from '@jest/globals';
import { cleanup, render } from '@testing-library/react';
import {
  computeProgressPerCompetency,
  getCompetencyImageFromIndex,
  getComponentIndexesFromGlobalQuestionIndex,
  getContextFromReference,
  getCurrentQuantile,
  getGlobalQuestionIndex,
  getProgressData,
  getRealValueFromPossibleValue, getSubCompetencyResultsAndResources,
  getTotalQuestionCount,
  getTotalQuestionCountCompetency,
  isUnknownValue,
  stringToHashCode,
  truncateLabel
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
    'answeredQuestionsCount': 51,
    'questionsCount': 51,
    'competenciesProgress': [
      {
        'answeredQuestionsCount': 11,
        'questionsCount': 11
      },
      {
        'answeredQuestionsCount': 13,
        'questionsCount': 13
      },
      {
        'answeredQuestionsCount': 27,
        'questionsCount': 27
      }
    ]
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
    {
      'competenciesResults': [{
        'label': 'Compétences sociales',
        'subCompetenciesResults': [{
          'label': 'Manager une équipe',
          'totalAnswered': 11,
          'totalQuestions': 11,
          'value': 61
        }],
        'totalAnswered': 11,
        'totalQuestions': 11,
        'value': 61
      }, {
        'label': 'Compétences personnelles',
        'subCompetenciesResults': [{
          'label': 'Adaptabilité',
          'totalAnswered': 2,
          'totalQuestions': 2,
          'value': 70
        }, {
          'label': 'Le leadership : un des leviers pour mener et conduire des individus ou des organisations',
          'totalAnswered': 3,
          'totalQuestions': 3,
          'value': 53
        }, {
          'label': 'L’éthique',
          'totalAnswered': 4,
          'totalQuestions': 4,
          'value': 60
        }, { 'label': 'L’esprit critique', 'totalAnswered': 4, 'totalQuestions': 4, 'value': 70 }],
        'totalAnswered': 13,
        'totalQuestions': 13,
        'value': 63
      }, {
        'label': 'Compétences Méthodologiques',
        'subCompetenciesResults': [{
          'label': 'Négocier',
          'totalAnswered': 5,
          'totalQuestions': 5,
          'value': 60
        }, {
          'label': 'Conduire un projet',
          'totalAnswered': 13,
          'totalQuestions': 13,
          'value': 64
        }, {
          'label': 'Résoudre un problème',
          'totalAnswered': 5,
          'totalQuestions': 5,
          'value': 56
        }, {
          'label': 'Faire preuve de créativité, chercher à innover et à entreprendre',
          'totalAnswered': 4,
          'totalQuestions': 4,
          'value': 55
        }],
        'totalAnswered': 27,
        'totalQuestions': 27,
        'value': 58
      }], 'totalAnswered': 27, 'totalQuestions': 27, 'value': 61
    }
  );
});

test('getRealValueFromPossibleValue', () => {
  expect(getRealValueFromPossibleValue(smallerQuestionnaireData.settings.possibleAnswers, 1)).toEqual(1);
});

test('isUnknownValue', () => {
  expect(isUnknownValue(smallerQuestionnaireData.settings.possibleAnswers, 1)).toBeFalsy();
});

test('getSubCompetencyResultsAndResources', () => {
  const expectedResults = [
    {
      "label": "Je suis amené(e) à manager une équipe",
      "value": 2,
      "questionsAnswers": [
        {
          "label": "Je comprends les enjeux et les principes d’animation d’une équipe dans un contexte professionnel.",
          "answer": 4
        },
        {
          "label": "Je sais (re)formuler les consignes pour que mes collaborateurs comprennent ce qui est attendu d’eux.",
          "answer": 3
        },
        {
          "label": "J’échange avec mes interlocuteurs en appliquant les principes de l’écoute active.",
          "answer": 1
        },
        {
          "label": "Pour accompagner le travail de mes collaborateurs, je fais preuve d’empathie et je favorise l’échange.",
          "answer": 3
        }
      ],
      "resources": []
    },
    {
      "label": "Manager une équipe, c’est aussi identifier et reconnaître les compétences de ses collaborateurs",
      "value": 3,
      "questionsAnswers": [
        {
          "label": "Je mets en place des méthodes et des outils d’évaluation des compétences.",
          "answer": 3
        },
        {
          "label": "Je mets en place des actions de valorisation des activités de mes collaborateurs.",
          "answer": 3
        },
        {
          "label": "Je mets en place des actions pour développer les compétences de mes collaborateurs.",
          "answer": 4
        }
      ],
      "resources": []
    },
    {
      "label": "En tant que manager d’équipe, une de mes missions est la prévention des tensions et conflits",
      "value": 3,
      "questionsAnswers": [
        {
          "label": "Je sais repérer les signaux faibles pour déterminer les situations de malaise.",
          "answer": 4
        },
        {
          "label": "Je sais mettre en place un plan de prévention pour éviter les tensions et les conflits.",
          "answer": 3
        }
      ],
      "resources": [
        {
          "id": "2401563827",
          "label": "J'utilise un correcteur orthographique",
          "content": "<p>My content <a href=\"http://google.com\" target=\"_blank\">www.google.com</a></p>\n",
          "references": "0:1:1,0:0:2"
        }
      ]
    },
    {
      "label": "En tant que manager d’équipe, je suis amené(e) à gérer des tensions et des conflits.",
      "value": 3,
      "questionsAnswers": [
        {
          "label": "Je sais me mettre dans une posture d’écoute et de médiation pour désamorcer les tensions et les conflits.",
          "answer": 3
        },
        {
          "label": "Je sais mettre en place des plans d’action et de suivi des solutions.",
          "answer": 3
        }
      ],
      "resources": []
    }
  ];

  expect(getSubCompetencyResultsAndResources(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    sampleAnswerData,
    smallerQuestionnaireData.resources,
    smallerQuestionnaireData.settings.possibleAnswers,
    0,
    0)).toEqual(expectedResults);
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

