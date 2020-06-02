// Set the basic translations
import React from 'react';
import HorizontalCardWithAction from './HorizontalCardWithAction';
import Paper from '@material-ui/core/Paper';

export default { title: 'Widget' };

const components = [
  <Paper/>,
  <Paper/>,
  <Paper/>,
]

export const horizontalCard = () => <HorizontalCardWithAction
  components={components}
/>;
