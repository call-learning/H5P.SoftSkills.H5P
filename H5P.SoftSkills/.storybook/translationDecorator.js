import React from 'react';
import { TranslationsContext } from '../src/contexts/TranslationsContext';
import translations from '../sampleData/translations.json';

const translationDecorator = storyFn => (
  <TranslationsContext.Provider value={translations.l10n}>{storyFn()}</TranslationsContext.Provider>
);

export default translationDecorator;
