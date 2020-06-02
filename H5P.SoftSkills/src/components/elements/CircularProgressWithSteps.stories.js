import React from 'react';

import CircularProgressWithStep from './CircularProgressWithStep';
export default { title: 'Widget' };

export const circularProgressWidgetJustStarted = () => (<CircularProgressWithStep insideText={"1"} value={0} isActive />);
export const circularProgressWidgetInactive = () => (<CircularProgressWithStep insideText={"1"} value={0} />);
export const circularProgressWidgetActive = () => (<CircularProgressWithStep insideText={"1"} value={40} isActive/>);
export const circularProgressWidgetNotActive = () => (<CircularProgressWithStep insideText={"1"} value={40}/>);
export const circularProgressWidgetFinished = () => (<CircularProgressWithStep insideText={"1"} value={100}/>);

