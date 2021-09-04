import PropTypes from 'prop-types';

export const aQuestionnaireResource = PropTypes.shape({
  label: PropTypes.string,
  content: PropTypes.string,
  references: PropTypes.string,
  imageUrl: PropTypes.string, // It was converted from H5P image to direct URL.
  image: PropTypes.shape({
    path: PropTypes.string,
    copyright: PropTypes.string,
    mime: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  })
});

export const questionnaireResource = {
  resource: aQuestionnaireResource
};

export const questionnaireResourceDefault = {
  resource: {
    label: '',
    content: '',
    references: ''
  }
};

export const questionnaireResources = {
  resources: PropTypes.arrayOf(
    aQuestionnaireResource
  )
};

export const questionnaireResourcesDefault = {
  resources: []
};

export const questionsByCompetencyAndSubCompetencies = {
  questionsByCompetencyAndSubCompetencies: PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        isvisible: PropTypes.bool,
        subCompetencies: PropTypes.arrayOf(
          PropTypes.shape({
              label: PropTypes.string,
              isvisible: PropTypes.bool,
              contexts: PropTypes.arrayOf(
                PropTypes.shape(
                  {
                    label: PropTypes.string,
                    isvisible: PropTypes.bool,
                    questions: PropTypes.arrayOf(
                      PropTypes.shape({
                        label: PropTypes.string,
                        overrides: PropTypes.shape({
                          answerLabelsOverride: PropTypes.arrayOf(
                            PropTypes.string
                          ),
                          acquisitionThreshold: PropTypes.number
                        }),
                        resources: PropTypes.arrayOf(
                          aQuestionnaireResource
                        )
                      })
                    )
                  }
                )
              )
            }
          )
        )
      }
    )
  )
};

export const possibleAnswers = {
  possibleAnswers: PropTypes.arrayOf(
    PropTypes.shape(
      {
        text: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }
    )
  )
};

export const possibleAnswersDefault = {
  possibleAnswers: [
    {
      "text": "Toujours",
      "id": 5,
    },
    {
      "text": "Souvent",
      "id": 4,
    },
    {
      "text": "Parfois",
      "id": 3
    },
    {
      "text": "Jamais",
      "id": 2
    },
    {
      "text": "Je ne sais pas",
      "id": 1
    }
  ]
};

export const questionnaireCompetenciesQuestionsDefault = {
  questionsByCompetencyAndSubCompetencies: []
};


export const simpleResultsType = PropTypes.arrayOf(
  PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    }
  )
);

export const simpleResultsTypeDefault = [];

export const questionnaireResults = {
  results: PropTypes.shape({
    value: PropTypes.number,
    totalQuestions: PropTypes.number,
    totalAnswered: PropTypes.number,
    competenciesResult:
      PropTypes.arrayOf(
        PropTypes.shape(
          {
            label: PropTypes.string,
            value: PropTypes.number,
            subCompetenciesResults:simpleResultsType
          }
        )
      )
  })
};

export const questionnaireResultsDefault = {
  results: {
    value: 0,
    totalQuestions: 0,
    totalAnswered: 0,
    competenciesResults: []
  }
};

export const questionnaireSettings = {
  settings: PropTypes.shape(
    {
      welcomeTitle: PropTypes.string,
      hasBadgeEngine: PropTypes.bool,
      alwaysDeliverBadge: PropTypes.bool,
      generalInstructions: PropTypes.string,
      footerText: PropTypes.string,
      startButtonLabel: PropTypes.string,
      instructionsDesc: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string,
          text: PropTypes.string,
        })
      ),
      possibleAnswers: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          id: PropTypes.number,
        })
      ),
    }
  )
};

export const questionnaireSettingsDefault = {
  settings: {}
};

export const questionnaireAnsweredQuestions = {
  answeredQuestions: PropTypes.arrayOf(
    PropTypes.shape(
      {
        answerId: PropTypes.number,
        questionGlobalIndex: PropTypes.number
      }
    )
  )
};

export const questionnaireAnsweredQuestionsDefault = {
  answeredQuestions: []
};

export const progressData = {
  progressData: PropTypes.shape(
    {
      answeredQuestionsCount: PropTypes.number,
      questionsCount: PropTypes.number,
      competenciesProgress: PropTypes.arrayOf(
        PropTypes.shape(
          {
            answeredQuestionsCount: PropTypes.number,
            questionsCount: PropTypes.number,
          }
        )
      )
    }
  )

};
export const progressDataDefault = {
  progressData: {
    answeredQuestionsCount: 0,
    questionsCount: 1,
    competenciesProgress: []
  }
};

