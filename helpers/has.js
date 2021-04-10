function hasAllSelector(content) {
  return /\*\s+[{#,]/.test(content);
}

function hasPlusSelector(content) {
  return /(\w|[.#])+\s*\+\s*/g.test(content);
}

function hasMediaQuerySelector(content) {
  return /@media/.test(content);
}

module.exports = {
  hasMediaQuerySelector,
  hasPlusSelector,
  hasAllSelector,
};
