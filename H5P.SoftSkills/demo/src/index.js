import React, { Component } from 'react';
import { render } from 'react-dom';
import globalSettings from '../../sampleData/demotestdata.json';


import H5P from '../../src/utils/H5P.mock';
import { QuestionnaireApp } from '../../src/QuestionnaireApp';
window.H5P = H5P;

export default class Demo extends Component {
  render () {
    return <QuestionnaireApp {...globalSettings}/>;

  }
}

render(<Demo/>, document.querySelector('#demo'));
