/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2020
 */

const {
  hasMediaQuerySelector,
  hasAllSelector,
  hasPlusSelector,
} = require('./helpers/has');

const {
  replaceAllSelector,
  replacePlusSelector,
  replaceDotSelector,
} = require('./helpers/replacers');

function _getHexadecimal(hex) {
  let tempHex = hex;

  const noHash = hex.substring(1);
  const [r1, r2, g1, g2, b1, b2] = noHash.split('');

  if (r1 === r2 && g1 === g2 && b1 === b2) {
    tempHex = `#${r1}${g1}${b1}`;
  }

  return tempHex;
}

class Minifier {
  constructor() {
    this.cssContent = [];
  }

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
          _getHexadecimal(match[0])
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
      !/url/g.test(content) && !/\b0%{/g.test(content)
        ? content.replace(
            /\b0{1}(vh|vw|ch|pc|in|mm|cm|ex|px|em|pt|rm|rem|%|deg)/g,
            '0'
          )
        : content
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
      /0\.\d+(vh|vw|ch|pc|in|mm|cm|ex|px|em|pt|rm|rem|%|deg|s|ms)*/g.test(
        content
      )
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
    let modifiedContent;
    this.cssContent = this.cssContent.map((content) => {
      modifiedContent = content;
      return /(outline|border|font-size-adjust):/g.test(modifiedContent)
        ? modifiedContent.replace(/none/g, '0')
        : modifiedContent;
    });
  }

  /**
   * It will remove extra white spaces
   */
  cleanWhiteSpace() {
    let modifiedContent;
    const from = [
      /\s*{\s*/g,
      /\s*}\s*/g,
      /\s*,\s*/g,
      /;\s+/g,
      /:\s+/g,
      /\s*>\s*/g,
      /\s*~\s*/g,
      /\s+!important/g,
      /\s{2,}/g,
      /\s*\+=\s*/g,
      /\s*\$\s*/g,
      /\s*\^\s*/g,
      /(\s+"|"\s+)/g,
      /(\s+\||\|\s+)/g,
      /(\s+\)|\)\s+)/g,
      /(\s+\(|\(\s+)/g,
      /(\s+\*=|\*=\s+)/g,
    ];
    const to = [
      '{',
      '}',
      ',',
      ';',
      ':',
      '>',
      '~',
      '!important',
      ' ',
      '=',
      '$',
      '^',
      '"',
      '|',
      ')',
      '(',
      '*=',
    ];

    // other selectors
    const selectorsRegex = /:(not|lang|child|type)\(.+\)[^:]/;

    const replaceWhiteSpaceMerge = (content) => {
      modifiedContent = content;

      from.forEach((regex, index) => {
        // remove the possible white spaces
        modifiedContent = modifiedContent.replace(regex, to[index]);

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
          modifiedContent = modifiedContent
            .replace(/\b[^:]\s*not\s*\(/g, ' not (')
            .replace(/\s*and\s*\(/g, ' and (');
        }

        // Check for Calc function
        if (/calc/g.test(modifiedContent)) {
          modifiedContent = modifiedContent
            .replace(/\s*\+\s*/g, ' + ')
            .replace(/\s*-\s*/g, ' - ')
            .replace(/\s*\/\s*/g, ' / ')
            .replace(/\s*\*\s*/g, ' * ');
        }

        // Check for not(), lang(), child(), type()
        if (
          selectorsRegex.test(modifiedContent) &&
          !/\),$/.test(modifiedContent)
        ) {
          modifiedContent = modifiedContent.replace(/\)\s*/, ') ');
        }
      });

      return modifiedContent;
    };

    this.cssContent = this.cssContent.map(replaceWhiteSpaceMerge);
  }

  /**
   * It will removes the single and double quotes only from URLs
   */
  cleanQuotes() {
    let match = null;
    let tempMatch = '';
    let modifiedContent;

    const urlRegex = /\burl\(("|')[\w-./=+:,?#\d]+("|')\)/g;

    this.cssContent = this.cssContent.map((content) => {
      modifiedContent = content;
      match = modifiedContent.match(urlRegex);

      if (match) {
        const [matchedVal] = match;
        tempMatch = matchedVal.replace(/("|')/g, '');
        modifiedContent = modifiedContent.replace(matchedVal, tempMatch);
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
    const { cssContent } = this;
    return new Promise((resolve, rejected) => {
      if (cssContent.length) {
        resolve(
          cssContent
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
