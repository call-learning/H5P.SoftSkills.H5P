import React from 'react';

import demoData from '../../sampleData/demotestdata.json';
import answeredQuestions from '../../sampleData/sampleAnswer.json';
import Question from '../components/questionnaire/Question';

export const sampleData = demoData;
export const sampleAnswerData = answeredQuestions;

export const sampleQuestionText = 'Lors de la rédaction, je prends en considération mon public cible et j\'adapte mon langage';

/**
 * Question handler: will handle the question state
 */
export class SampleQuestionHandler extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      selectedItemId: this.props.defaultSelected ? this.props.defaultSelected : 0
    };
    this.handleEnableQuestion = this.handleEnableQuestion.bind(this);
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
  }

  handleSelectAnswer (questionID, answerId) {
    this.setState((state, props) => ({ selectedItemId: parseInt(answerId) }));
  }

  handleEnableQuestion (questionID) {
    this.setState((state, props) => ({ isDisabled: false }));
  }

  render () {
    return (<Question
      questionID={this.props.questionID}
      questionText={this.props.questionText}
      selectedItemId={this.state.selectedItemId}
      isDisabled={this.state.isDisabled}
      handleSelectAnswer={this.handleSelectAnswer}
      handleEnableQuestion={this.handleEnableQuestion}/>);
  }
}


export const sampleInstructionPageSettings = {
  welcomeTitle: 'Bienvenue sur le\nTest d\'auto-positionnement sur les soft skills.',
  generalInstructions: 'Ce questionnaire vous permettra d’identifier vos compétences transversales, autrement appelées soft skills, et vous proposera des ressources d’auto-formation afin d’accompagner le développement de ces compétences.',
  startButtonLabel: 'Démarrer le test',
  competenciesDesc: [
    {
      imagePath: 'assets/social.png',
      title: 'Compétences sociales',
      description: 'Quelle est votre capacité à travailler avec d’autres personnes dans un contexte professionnel où l’interaction est importante ?'
    },
    {

      imagePath: 'assets/personal.png',
      title: 'Compétences personelles',
      description: 'Quelles aptitudes personnelles utiles dans un contexte professionnel avez-vous développées ?'
    },
    {
      imagePath: 'assets/methodological.png',
      title: 'Compétences méthodologiques',
      description: 'Par quelles démarches réussissez-vous à organiser vos activités professionnelles ?'
    }
  ],

  instructionsDesc: [
    {
      icon: 'timer',
      text: 'Le test dure environ 10 minutes\n'
    },
    {
      icon: 'sentiment_very_satisfied',
      text: 'Répondez avec honnêteté'
    },
    {
      icon: 'playlist_add_check',
      text: 'Évitez autant que possible les "je ne sais pas"'
    }
  ],
  possibleAnswers: [
    {
      text: 'Toujours',
      id: 5
    },
    {
      text: 'Souvent',
      id: 4
    },
    {
      text: 'Parfois',
      id: 3
    },
    {
      text: 'Jamais',
      id: 2
    },
    {
      text: 'Ne sais pas',
      id: 1
    }
  ]
};

export const samplePossibleAnswers = [
  {
    'text': 'Toujours',
    'id': 5
  },
  {
    'text': 'Souvent',
    'id': 4
  },
  {
    'text': 'Parfois',
    'id': 3
  },
  {
    'text': 'Jamais',
    'id': 2
  },
  {
    'text': 'Ne sais pas',
    'id': 1
  }
];

const maxPossibleAnswer = 5;

export const sampleAnswerGenerator = (questionIndexMax) => {
  let returnArray = [];
  while(questionIndexMax--) {
    returnArray.push({ answerId: Math.floor(Math.random() * maxPossibleAnswer), questionGlobalIndex: questionIndexMax });
  }
  return returnArray;
}
