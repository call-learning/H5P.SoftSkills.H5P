import { useContext } from 'react';
import React from 'react';
import { TranslationsContext } from '../contexts/TranslationsContext';
import PropTypes from 'prop-types';
import { resourceCreateMarkup } from './ComponentsUtils';
import {unescape} from 'lodash';

/**
 * This is a simple component that uses the context so to get
 * translation for different key strings
 * @param props
 * @constructor
 */
function H5PTranslatedText (props) {
  const allTranslations = useContext(TranslationsContext);
  let text = allTranslations && (props.text in allTranslations) ? allTranslations[props.text]: `[${props.text}]`;
  text = unescape(text);
  if (props.arguments) {
    for(let argname in props.arguments) {
        text = text.replace(`:${argname}`,props.arguments[argname]);
    }
  }
  return (<span dangerouslySetInnerHTML={resourceCreateMarkup(text)}/>)
}

H5PTranslatedText.propTypes = {
  text: PropTypes.string,
  arguments: PropTypes.object

};
H5PTranslatedText.defaultProps = {
  text: '',
  arguments: {}
};
export default H5PTranslatedText;
