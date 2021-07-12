import React from 'react';
import CongratulationsPage from './CongratulationsPage';

export default { title: 'Page' };

export const simpleCongratulations = () => (<CongratulationsPage  handleViewResultsClick={() =>
  // eslint-disable-next-line no-undef
  console.log('View Results')}
/>);

