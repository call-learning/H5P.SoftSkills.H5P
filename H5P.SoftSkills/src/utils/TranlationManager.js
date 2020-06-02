class TranslationManager {
  constructor(translations) {
    this._translations = [];
  }

  _setTranslations(translationsList) {
    this._translations = translationsList;
    Object.freeze(this);
  }
  _hasTranslations() {
    return  this._translations.length > 0;
  }
  translate(stringName, params = []){
    return stringName in this._translations ? translated[stringName] : `[${stringName}]`;
  }
}

const tInstance = new TranslationManager();

export const setTranslations = (translationsList) => {
  const isTranslationSet  = tInstance._hasTranslations();
  if (!isTranslationSet) {
    tInstance._setTranslations(translationsList);
    Object.freeze(tInstance);
  }
};

export default tInstance;

