import React from 'react';
import VerticalProgressWithSteps from './VerticalProgressWithSteps';
import { Box } from '@material-ui/core';
import H5P from '../../utils/H5P.mock';

export default { title: 'Widget' };

window.H5P = H5P;

export const basicSideNavigation = () => (<Box display="flex" flexDirection="column" height="1200px">
  <VerticalProgressWithSteps progressInfo={[100,40,0]}/>
</Box>);
