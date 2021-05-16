/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2021
 */

const { REGEX_OTHER_SELECTOR } = require('./regex');

function hasAllSelector(content) {
  return /\*/g.test(content);
}

function hasPlusSelector(content) {
  return /[\w.#]+\s*\+\s*.+[,{]/g.test(content);
}

function hasMediaQuerySelector(content) {
  return /@media/.test(content);
}

function hasCalcFunction(content) {
  return /calc/g.test(content);
}

function hasOtherSelectors(content) {
  return REGEX_OTHER_SELECTOR.test(content) && !/\),$/g.test(content);
}

function hasNotPrefixZero(content) {
  return /url/g.test(content) && /\b0%{/g.test(content);
}

module.exports = {
  hasMediaQuerySelector,
  hasOtherSelectors,
  hasNotPrefixZero,
  hasCalcFunction,
  hasPlusSelector,
  hasAllSelector,
};
