/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2021
 */

function replaceAllSelector(content) {
  return content.replace(/\*/g, '*');
}

function replacePlusSelector(content) {
  return content.replace(/\s*\+\s*/g, '+');
}

function replaceDotSelector(content) {
  return content.replace(/\)\./g, ') .');
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

module.exports = {
  replaceParenthesisFromOtherSelectors,
  replaceMediaQuerySelector,
  replaceCalcFunction,
  replacePlusSelector,
  replaceDotSelector,
  replaceAllSelector,
  replaceQuotes,
};
