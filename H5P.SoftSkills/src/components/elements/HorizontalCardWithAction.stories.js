import React from 'react';
import HorizontalCardWithAction from './HorizontalCardWithAction';
import Paper from '@material-ui/core/Paper';

export default { title: 'Widget' };

const components = [
  /* eslint-disable react/jsx-key */
  <Paper/>,
  <Paper/>,
  <Paper/>,
  /* eslint-enable react/jsx-key */
]

export const horizontalCard = () => <HorizontalCardWithAction
  components={components}
/>;
