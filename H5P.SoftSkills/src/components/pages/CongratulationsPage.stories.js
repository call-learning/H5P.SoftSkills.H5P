import React from 'react';
import CongratulationsPage from './CongratulationsPage';

export default { title: 'Page' };

export const simpleCongratulations = () => (<CongratulationsPage  handleViewResultsClick={e =>
  console.log('View Results')}
/>);

