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
  getRealValueFromPossibleValue, getSubCompetencyResultsAndResources, getTextValueFromPossibleValue,
  getTotalQuestionCount,
  getTotalQuestionCountCompetency, isAcquiredAnswer,
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
    smallerQuestionnaireData.settings)).toEqual(
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
        'label': 'Compétences Personnelles',
        'subCompetenciesResults': [{
          'label': 'Adaptabilité',
          'totalAnswered': 2,
          'totalQuestions': 2,
          'value': 70
        }, {
          'label': 'Le leadership: un des leviers pour mener et conduire des individus ou des organisations',
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
  expect(isUnknownValue(smallerQuestionnaireData.settings, 1)).toBeTruthy()
  expect(isUnknownValue(smallerQuestionnaireData.settings, 2)).toBeFalsy();
  expect(isUnknownValue(smallerQuestionnaireData.settings, 60)).toBeFalsy();
});

test('getSubCompetencyResultsAndResources', () => {
  const expectedResults = [
    {
      'label': 'Je suis amené(e) à manager une équipe',
      'questionsAnswers': [
        {
          'answer': 4,
          'questionData': {
            'answerLabelsOverride': [
              'Tout à fait d\'accord',
              'Plutôt d\'accord',
              'D\'accord',
              'Plutôt pas d\'accord',
              'Pas d\'accord'
            ],
            'label': 'Je comprends les enjeux et les principes d’animation d’une équipe dans un contexte professionnel.'
          }
        },
        {
          'answer': 3,
          'questionData': {
            'answerLabelsOverride': [
              'Tout à fait d\'accord',
              'Plutôt d\'accord',
              'D\'accord',
              'Plutôt pas d\'accord',
              'Pas d\'accord'
            ],
            'label': 'Je sais (re)formuler les consignes pour que mes collaborateurs comprennent ce qui est attendu d’eux.'
          }
        },
        {
          'answer': 1,
          'questionData': {
            'label': 'J’échange avec mes interlocuteurs en appliquant les principes de l’écoute active.'
          }
        },
        {
          'answer': 3,
          'questionData': {
            'label': 'Pour accompagner le travail de mes collaborateurs, je fais preuve d’empathie et je favorise l’échange.'
          }
        }
      ],
      'resources': [],
      'value': 2
    },
    {
      'label': 'Manager une équipe, c’est aussi identifier et reconnaître les compétences de ses collaborateurs',
      'questionsAnswers': [
        {
          'answer': 3,
          'questionData': {
            'label': 'Je mets en place des méthodes et des outils d’évaluation des compétences.'
          }
        },
        {
          'answer': 3,
          'questionData': {
            'label': 'Je mets en place des actions de valorisation des activités de mes collaborateurs.'
          }
        },
        {
          'answer': 4,
          'questionData': {
            'label': 'Je mets en place des actions pour développer les compétences de mes collaborateurs.'
          }
        }
      ],
      'resources': [],
      'value': 3
    },
    {
      'label': 'En tant que manager d’équipe, une de mes missions est la prévention des tensions et conflits',
      'questionsAnswers': [
        {
          'answer': 4,
          'questionData': {
            'label': 'Je sais repérer les signaux faibles pour déterminer les situations de malaise.'
          }
        },
        {
          'answer': 3,
          'questionData': {
            'answerLabelsOverride': [
              'Tout à fait d\'accord',
              'Plutôt d\'accord',
              'D\'accord',
              'Plutôt pas d\'accord',
              'Pas d\'accord'
            ],
            'label': 'Je sais mettre en place un plan de prévention pour éviter les tensions et les conflits.'
          }
        }
      ],
      'resources': [
        {
          'content': '<p>La suite Office dispose de correcteurs orthographiques intégrés qui vous permettent de corriger la plupart des fautes d’orthographe et de grammaire. Voir comment utiliser le correcteur ortographique dans Word, Excel & Powerpoint.<br> <a href="http://microsoft.com" target="_blank">www.microsoft.com</a></p>\n',
          'id': '3216496693',
          'image': {
            'params': {
              'contentName': 'Image',
              'file': {
                'copyright': {
                  'license': 'U'
                },
                'height': 1024,
                'mime': 'image/png',
                'path': 'images/microsoft-logo.png',
                'width': 864
              }
            }
          },
          'references': '0:1:1,0:0:2'
        }
      ],
      'value': 3
    },
    {
      'label': 'En tant que manager d’équipe, je suis amené(e) à gérer des tensions et des conflits.',
      'questionsAnswers': [
        {
          'answer': 3,
          'questionData': {
            'answerLabelsOverride': [
              'Tout à fait d\'accord',
              'Plutôt d\'accord',
              'D\'accord',
              'Plutôt pas d\'accord',
              'Pas d\'accord'
            ],
            'label': 'Je sais me mettre dans une posture d’écoute et de médiation pour désamorcer les tensions et les conflits.'
          }
        },
        {
          'answer': 3,
          'questionData': {
            'answerLabelsOverride': [
              'Tout à fait d\'accord',
              'Plutôt d\'accord',
              'D\'accord',
              'Plutôt pas d\'accord',
              'Pas d\'accord'
            ],
            'label': 'Je sais mettre en place des plans d’action et de suivi des solutions.'
          }
        }
      ],
      'resources': [],
      'value': 3
    }
  ];

  expect(getSubCompetencyResultsAndResources(
    smallerQuestionnaireData.questionsByCompetencyAndSubCompetencies,
    sampleAnswerData,
    smallerQuestionnaireData.resources,
    smallerQuestionnaireData.settings,
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

test('getTextValueFromPossibleValue', () => {
  const answerOverride = [
    'Tout à fait d\'accord',
    'Plutôt d\'accord',
    'D\'accord',
    'Plutôt pas d\'accord',
    'Pas d\'accord'
  ];
  const sampleQuestionData = { 'label': 'Test question' };

  expect(getTextValueFromPossibleValue(smallerQuestionnaireData.settings, sampleQuestionData, 3)).toEqual('Parfois');
  expect(getTextValueFromPossibleValue(smallerQuestionnaireData.settings, sampleQuestionData, 2)).toEqual('Jamais');
  expect(getTextValueFromPossibleValue(smallerQuestionnaireData.settings, sampleQuestionData, 50)).toEqual('');
  expect(getTextValueFromPossibleValue(smallerQuestionnaireData.settings,
    { 'label': 'Test question', 'answerLabelsOverride': answerOverride }, 1)).toEqual('Pas d\'accord');
  expect(getTextValueFromPossibleValue(smallerQuestionnaireData.settings,
    { 'label': 'Test question', 'answerLabelsOverride': answerOverride }, 5)).toEqual('Tout à fait d\'accord');
});

test('isAcquiredAnswer', () => {
  const sampleQuestionData = { 'label': 'Test question' };
  const modifiedQuestionData = { 'label': 'Test question', 'acquisitionThreshold': 2 };
  expect(isAcquiredAnswer(smallerQuestionnaireData.settings, sampleQuestionData, 5)).toEqual(true);
  expect(isAcquiredAnswer(smallerQuestionnaireData.settings, sampleQuestionData, 4)).toEqual(true);
  expect(isAcquiredAnswer(smallerQuestionnaireData.settings, sampleQuestionData, 3)).toEqual(false);
  expect(isAcquiredAnswer(smallerQuestionnaireData.settings, modifiedQuestionData, 3)).toEqual(true);
  expect(isAcquiredAnswer(smallerQuestionnaireData.settings, modifiedQuestionData, 2)).toEqual(true);
  expect(isAcquiredAnswer(smallerQuestionnaireData.settings, modifiedQuestionData, 1)).toEqual(false);

});

