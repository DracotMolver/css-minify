function replaceAllSelector(content) {
  return content.replace(/\*/g, '*');
}

function replacePlusSelector(content) {
  return content.replace(/\s*\+\s*/g, '+');
}

function replaceDotSelector(content) {
  return content.replace(/\)\./g, ') .');
}

module.exports = {
  replacePlusSelector,
  replaceDotSelector,
  replaceAllSelector,
};
