import PropTypes from 'prop-types';

export const aQuestionnaireResource = PropTypes.shape({
  label: PropTypes.string,
  content: PropTypes.string,
  references: PropTypes.string,
  image: PropTypes.any // TODO check for H5P image data here
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
                      PropTypes.string
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
        unknown: PropTypes.bool,
        realValue: PropTypes.number,
      }
    )
  )
};

export const possibleAnswersDefault = {
  possibleAnswers: [
    {
      text: 'Option A',
      id: 5
    },
    {
      text: 'Option B',
      id: 4
    },
    {
      text: 'Option C',
      id: 3
    },
    {
      text: 'Option D',
      id: 2
    },
    {
      text: 'No Choice',
      id: 1,
      unknown: true
    }
  ]
};

export const questionnaireCompetenciesQuestionsDefault = {
  questionsByCompetencyAndSubCompetencies: []
};

export const questionnaireResults = {
  results: PropTypes.arrayOf(
    PropTypes.shape(
      {
        label: PropTypes.string,
        value: PropTypes.number,
        subCompetenciesResults: PropTypes.arrayOf(
          PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.number,
            }
          )
        )
      }
    )
  )
};

export const questionnaireResultsDefault = {
  results: []
};

export const questionnaireSettings = {
  settings: PropTypes.shape(
    {
      welcomeTitle: PropTypes.string,
      generalInstructions: PropTypes.string,
      startButtonLabel: PropTypes.string,
      competenciesDesc: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        })
      ),
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
      totalAnsweredQuestions: PropTypes.number,
      competenciesProgress: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.number // Subcompetency progress
        )
      )
    }
  )

};
export const progressDataDefault = {
  progressData: {
    totalAnsweredQuestions: 0,
    competenciesProgress: []
  }
};
