import React from 'react';
import InstructionPage from './InstructionPage';
import { sampleInstructionPageSettings } from '../../utils/StoriesUtils';

export default { title: 'Page' };

export const simpleInstructionPage = () => (<InstructionPage {...sampleInstructionPageSettings} startQuestionnaire={e =>
  // eslint-disable-next-line no-undef
  console.log('Start Questionnaire')}
/>);

