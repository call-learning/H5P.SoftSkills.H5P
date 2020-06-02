import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import { render } from 'react-dom';
import { QuestionnaireApp } from './QuestionnaireApp';
import { TranslationsContext } from './contexts/TranslationsContext';
import { H5PContext } from './contexts/H5PContext';

H5P.SoftSkills = class {

  /**
   * @param {Object}        params.l10n
   * @constructor
   */
  constructor (params, contentId, extras) {

    H5P.EventDispatcher.call(this);
    H5P.SoftSkills.prototype = Object.create(H5P.EventDispatcher.prototype);
    H5P.SoftSkills.prototype.constructor = H5P.SoftSkills;
    /**
     * Required function H5P uses to attach library to wrapper.
     *
     * @param {jQuery} $wrapper
     */
    this.attach = function (container) {
      render(
        (
          <TranslationsContext.Provider value={params.l10n}>
            <H5PContext.Provider value={{
              contentId: contentId,
              currentLibrary: params.library,
              saveState: this.save.bind(this),
              finishAction: this.finish.bind(this)
            }}>
              <QuestionnaireApp {...params}/>
            </H5PContext.Provider>
          </TranslationsContext.Provider>
        ),
        container.get(0));
    };
    this.finish = function (state, dataId) {
      this.save(state, dataId);
    };
    this.save = function (state, dataId) {
      H5P.setUserData(contentId, dataId, state);
    };
  }
};

export default H5P.SoftSkills;

