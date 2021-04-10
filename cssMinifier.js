/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2021
 */

const {
  REGEX_ZERO_FLOAT_PREFIX,
  REGEX_WHITE_SPACE_FROM,
  REGEX_WHITE_SPACE_TO,
  REGEX_ZERO_PREFIX,
  REGEX_BY_ZERO,
  REGEX_URL,
} = require('./helpers/regex');

const {
  hasMediaQuerySelector,
  hasOtherSelectors,
  hasNotPrefixZero,
  hasPlusSelector,
  hasCalcFunction,
  hasAllSelector,
} = require('./helpers/has');

const {
  replaceParenthesisFromOtherSelectors,
  replaceMediaQuerySelector,
  replacePlusSelector,
  replaceCalcFunction,
  replaceAllSelector,
  replaceDotSelector,
  replaceQuotes,
} = require('./helpers/replacers');

const { getHexadecimal } = require('./helpers/utils');

class Minifier {
  constructor() {
    this.cssContent = [];
  }

  // -------------- PRIVATE FUNCTIONS --------------
  _replaceWhiteSpaceMerge(content) {
    let modifiedContent = content;

    REGEX_WHITE_SPACE_FROM.forEach((regex, index) => {
      // remove the possible white spaces
      modifiedContent = modifiedContent.replace(
        regex,
        REGEX_WHITE_SPACE_TO[index]
      );

      // replace selector all `*`
      if (hasAllSelector(modifiedContent)) {
        modifiedContent = replaceAllSelector(modifiedContent);
      }

      // NOTE: we must be careful with the `+` symbol
      // it's wild use in several ways so, we must applay
      // a different regular expression to it
      if (hasPlusSelector(modifiedContent)) {
        modifiedContent = replacePlusSelector(modifiedContent);
      }

      // prevent dots next to parenthesis
      modifiedContent = replaceDotSelector(modifiedContent);

      // Check for media queries
      if (hasMediaQuerySelector(modifiedContent)) {
        modifiedContent = replaceMediaQuerySelector(modifiedContent);
      }

      // Check for Calc function
      if (hasCalcFunction(modifiedContent)) {
        modifiedContent = replaceCalcFunction(modifiedContent);
      }

      // Check for not(), lang(), child(), type()
      if (hasOtherSelectors(modifiedContent)) {
        modifiedContent = replaceParenthesisFromOtherSelectors(modifiedContent);
      }
    });

    return modifiedContent;
  }

  // -------------- PUBLIC FUNCTIONS --------------

  setContent(cssContent) {
    this.cssContent = cssContent.map((content) => content.trim());
  }

  /**
   * It will replace all the full hexadecimal values by it shorten form
   */
  replaceFullHexadecimalByShorten() {
    let match;
    let modifiedContent;

    // go though each line of the css file
    this.cssContent = this.cssContent.map((content) => {
      modifiedContent = content;
      match = modifiedContent.match(/#[a-f\d]{6}/gi);

      if (match && match[0].length > 4) {
        modifiedContent = modifiedContent.replace(
          match[0],
          getHexadecimal(match[0])
        );
      }

      return modifiedContent;
    });
  }

  /**
   * It will remove all the zero units by 0
   * E.g. 0px => 0
   */
  cleanUnitsZeroValue() {
    // Avoid removing data from path into url attribute and animation keyframe
    this.cssContent = this.cssContent.map((content) =>
      hasNotPrefixZero(content)
        ? content
        : content.replace(REGEX_ZERO_PREFIX, '0')
    );
  }

  /**
   * It will remove the zero prefix from a float number
   * E.g. 0.90em => .9em
   *
   * TODO: remove from transforming and some animations too
   */
  cleanZeroPrefixFloat() {
    this.cssContent = this.cssContent.map((content) =>
      REGEX_ZERO_FLOAT_PREFIX.test(content)
        ? content.replace(/0\./g, '.')
        : content
    );
  }

  /**
   * Replace `none` for `0`. only in the next css styles
   *p
   * font-size-adjust
   * border
   * outline
   */
  replaceNoneByZero() {
    this.cssContent = this.cssContent.map((content) =>
      REGEX_BY_ZERO.test(content) ? content.replace(/none/g, '0') : content
    );
  }

  /**
   * It will remove extra white spaces
   */
  cleanWhiteSpace() {
    this.cssContent = this.cssContent.map(this._replaceWhiteSpaceMerge);
  }

  /**
   * It will removes the single and double quotes only from URLs
   */
  cleanQuotes() {
    let match = null;

    this.cssContent = this.cssContent.map((content) => {
      let modifiedContent = content;
      match = modifiedContent.match(REGEX_URL);

      if (match) {
        const [matchedVal] = match;
        modifiedContent = replaceQuotes(matchedVal, modifiedContent);
      }

      return modifiedContent;
    });
  }

  /**
   * It will finally minify the css file removing:
   *
   * * comments
   * * last `;`
   * * sets everything in on line
   */
  getMinifiedCSS() {
    const content = this.cssContent;

    return new Promise((resolve, rejected) => {
      if (content.length) {
        resolve(
          content
            .join('')
            .replace(/[;\s]+}/g, '}')
            .replace(/\/\*.*?\*\//g, '')
        );
      } else {
        rejected(new Error('Empty file to minify'));
      }
    });
  }
}

module.exports = Minifier;
