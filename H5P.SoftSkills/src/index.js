import React, { Component } from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import { render } from 'react-dom';
import { QuestionnaireApp } from './QuestionnaireApp';

H5P.SoftSkills = class {

  /**
   * @param {Object}        params.l10n
   * @constructor
   */
  constructor (params, contentid, extras) {

    /**
     * Required function H5P uses to attach library to wrapper.
     *
     * @param {jQuery} $wrapper
     */
    this.attach = function ($container) {
      render(<QuestionnaireApp {...params} contentId={contentid} currentLibrary={params.library}/>, $container.get(0));
    };
  }
};

export default H5P.SoftSkills;

