/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2021
 */
const {
  hasSpaceNextToClosedBrace,
  hasSpaceMextToOpenedBrace,
  hasPlusSelector,
  hasAllSelector,
} = require('./has');

function replaceAllSelector(content) {
  let _content = content;

  if (hasAllSelector(content)) {
    _content = content.replace(/\s*\*\s*/g, ' * ');

    if (/\*\s+[{,]/g.test(_content)) {
      _content = _content.replace(/\*\s+/g, '*');
    } else if (/\s*\*\s+=/g.test(_content)) {
      _content = _content.replace(/\s*\*\s+=/g, '*=');
    }
  }

  return _content;
}

function replacePlusSelector(content) {
  let _content = content;

  if (hasPlusSelector(content)) {
    _content = content.replace(/\s*\+\s*/g, '+');
  }

  return _content;
}

function replaceMediaQuerySelector(content) {
  return content
    .replace(/\b[^:]\s*not\s*\(/g, ' not (')
    .replace(/\s*and\s*\(/g, ' and (');
}

function replaceCalcFunction(content) {
  return content
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s*-\s*/g, ' - ')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s*\*\s*/g, ' * ');
}

function replaceParenthesisFromOtherSelectors(content) {
  return content.replace(/\)\s*/, ') ');
}

function replaceQuotes(content, replacer) {
  const tempMatch = replacer.replace(/("|')/g, '');
  return content.replace(replacer, tempMatch);
}

function replaceGeneralSpace(content) {
  let _content = content;

  if (hasSpaceMextToOpenedBrace(content)) {
    _content = content.replace(/\s+\{/g, '{');
  }

  if (hasSpaceNextToClosedBrace(content)) {
    _content = content.replace(/\s+\}/g, '{');
  }

  return _content;
}

module.exports = {
  replaceParenthesisFromOtherSelectors,
  replaceMediaQuerySelector,
  replaceGeneralSpace,
  replaceCalcFunction,
  replacePlusSelector,
  replaceAllSelector,
  replaceQuotes,
};
