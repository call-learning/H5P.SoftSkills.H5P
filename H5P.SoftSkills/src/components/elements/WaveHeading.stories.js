import React from 'react';
import H5P from '../../utils/H5P.mock';
import WaveHeading from './WaveHeading';

export default { title: 'Widget' };

window.H5P = H5P;
const welcomeText = 'Bienvenue sur le\n Test d\'auto-positionnement sur les soft skills';

export const waveHeading = () => (<WaveHeading title={welcomeText}/>);
