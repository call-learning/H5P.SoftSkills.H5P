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
  getTotalQuestionCountCompetency, isAcquiredAnswer, isFullyAcquired,
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
        "answeredQuestionsCount": 15,
        "questionsCount": 15
      },
      {
        "answeredQuestionsCount": 25,
        "questionsCount": 25
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
              "value": 74
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
          "value": 70
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
              "label": "Faire preuve de créativité, chercher à innover et à entreprendre",
              "totalAnswered": 4,
              "totalQuestions": 4,
              "value": 60
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
              "value": 75
            }
          ],
          "totalAnswered": 15,
          "totalQuestions": 15,
          "value": 68
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
              "value": 64
            },
            {
              "label": "Conduire un projet",
              "totalAnswered": 13,
              "totalQuestions": 13,
              "value": 66
            },
            {
              "label": "Résoudre un problème",
              "totalAnswered": 5,
              "totalQuestions": 5,
              "value": 68
            }
          ],
          "totalAnswered": 25,
          "totalQuestions": 25,
          "value": 69
        }
      ],
      "totalAnswered": 67,
      "totalQuestions": 67,
      "value": 69.5
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
  const result = getSubCompetencyResultsAndResources(
    sampleData.questionsByCompetencyAndSubCompetencies,
    sampleAnswerData,
    sampleData.resources,
    sampleData.settings,
    0,
    0);

  expect(result.length == 3).toBeTruthy();
  expect(result[0].questionsAnswers.length == 2).toBeTruthy();
  expect(result[0].resources[0]).toEqual(
    {
      "content": "Un guide pratique pour l’écriture inclusive diffusé par le Haut conseil d’état chargé de l’Egalité entre les femmes et les hommes et de la lutte contre les discriminations ©2016<br><a href=\"http://www.haut-conseil-egalite.gouv.fr/IMG/pdf/guide_pour_une_communication_publique_sans_stereotype_de_sexe_vf_2016_11_02.compressed.pdf\">http://www.haut-conseil-egalite.gouv.fr/IMG/pdf/guide_pour_une_communication_publique_sans_stereotype_de_sexe_vf_2016_11_02.compressed.pdf</a>",
      "id": "380651661",
      "references": "0:0:0:1",
      "type": "document"
    }
  );
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

test('isFullyAcquired', () => {
  const subQuestionnaire = [
      {
        "label": "Compétences Sociales",
        'subCompetencies': [
          {
            'label': 'Communiquer pour transmettre des idées et des informations nécessaires au travail',
            'isVisible': true,
            'contexts': [
              {
                'label': 'Je suis amené(e) à rédiger un document écrit dans une situation professionnelle précise:',
                'isVisible': true,
                'questions': [
                  {
                    'label': 'Lors de la rédaction, je prends en considération mon public cible et j’adapte mon langage.',
                    'acquisitionThreshold': 5
                  },
                  {
                    'label': 'Je choisis le format et j’adapte mon registre à la situation (rapport, power point, mail, lettre interne, note de service, réseau social interne).'
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

  const insufficientAnswers = [
    {
      "answerId": 2,
      "questionGlobalIndex": 0
    },
    {
      "answerId": 5,
      "questionGlobalIndex": 1
    } ];
  expect(isFullyAcquired(sampleData.questionsByCompetencyAndSubCompetencies, sampleAnswerData, sampleData.settings)).toBeFalsy();

  expect(isFullyAcquired(subQuestionnaire, sampleAnswerData, sampleData.settings)).toBeTruthy();
  expect(isFullyAcquired(subQuestionnaire, insufficientAnswers, sampleData.settings)).toBeFalsy();
});
