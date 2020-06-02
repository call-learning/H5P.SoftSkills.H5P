import React from 'react';
import InstructionPage from './InstructionPage';
import { sampleInstructionPageSettings } from '../../utils/StoriesUtils';

export default { title: 'Page' };

export const simpleInstructionPage = () => (<InstructionPage {...sampleInstructionPageSettings} startQuestionnaire={e =>
  console.log('Start Questionnaire')}
/>);

