import React, {useState} from 'react';
import PropTypes from 'prop-types';
import demoData from '../../sampleData/demotestdata.json';
import answeredQuestions from '../../sampleData/sampleAnswer.json';
import Question from '../components/questionnaire/Question';

export const sampleData = demoData;
export const sampleAnswerData = answeredQuestions;

export const sampleQuestionText = 'Lors de la rédaction, je prends en considération mon public cible et j\'adapte mon langage';

/**
 * Question handler: will handle the question state
 */
export const SampleQuestionHandler = (props) => {
  const [isDisabled, setIsDisabled] = useState(props.isDisabled || false);
  const [selectedItemId, setSelectedItemId] = useState(props.selectedItemId || 0);

  const handleSelectAnswer = (questionID, answerId) => {
    setSelectedItemId(parseInt(answerId));
  }

  const handleEnableQuestion = () => {
    setIsDisabled(false)
  }

  return (
    <Question
    questionID={props.questionID}
    questionText={props.questionText}
    answerLabelsOverride={props.answerLabelsOverride}
    selectedItemId={selectedItemId}
    isDisabled={isDisabled}
    handleSelectAnswer={handleSelectAnswer}
    handleEnableQuestion={handleEnableQuestion}/>
  );
}

SampleQuestionHandler.propTypes = {
  questionID: PropTypes.string, // Question identifier. Provided in the event as a unique id.
  selectedItemId: PropTypes.number,
  questionText: PropTypes.string,
  answerLabelsOverride: PropTypes.arrayOf(
    PropTypes.string
  ),
  isDisabled: PropTypes.bool
};

export const sampleInstructionPageSettings = {
  welcomeTitle: "Bachelor\nTest d’auto-positionnement compétences\nmanagériales & conduite de projet.",
  generalInstructions: 'Ce questionnaire vous permettra d’identifier vos compétences transversales, autrement appelées soft skills, et vous proposera des ressources d’auto-formation afin d’accompagner le développement de ces compétences.',
  startButtonLabel: 'Démarrer le test',
  footerText: "Le projet  « HESAM 2030 - Construisons nos Métiers ! » est lauréat du second  <br/> appel à projets « Nouveaux cursus à l’université » du troisième Programme <br/> d’Investissements d’Avenir (PIA 3) - convention n°ANR – 18 - NCU – 0028.",
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
