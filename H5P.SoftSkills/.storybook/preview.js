import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { addParameters, addDecorator, configure } from '@storybook/react';
import themeDecorator from './themeDecorator';
import translationDecorator from './translationDecorator';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';

// Option defaults:
addParameters({
  options: {
    brandTitle: 'H5P SoftSkills',
    showPanel: true,
  },
  info: {
    inline: false,
    header: false,
    source: true,
    components: {
      code: function({language, code}) {
        return (
          <SyntaxHighlighter language="jsx" format={false} copyable={false}>{code}</SyntaxHighlighter>
        );
      },
    }
  },
});


addDecorator(withInfo);
addDecorator(themeDecorator);
addDecorator(translationDecorator);
