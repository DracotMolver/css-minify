/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2021
 */

const REGEX_OTHER_SELECTOR = /:(not|lang|child|type)\(.+\)[^:]/;

const REGEX_URL = /\burl\(("|')[\w-./=+:,?#\d]+("|')\)/g;

const REGEX_BY_ZERO = /(outline|border|font-size-adjust):/g;

const REGEX_ZERO_FLOAT_PREFIX = /0\.\d+(vh|vw|ch|pc|in|mm|cm|ex|px|em|pt|rm|rem|%|deg|s|ms)*/g;

const REGEX_ZERO_PREFIX = /\b0{1}(vh|vw|ch|pc|in|mm|cm|ex|px|em|pt|rm|rem|%|deg)/g;

const REGEX_WHITE_SPACE_FROM = [
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

const REGEX_WHITE_SPACE_TO = [
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

module.exports = {
  REGEX_ZERO_FLOAT_PREFIX,
  REGEX_WHITE_SPACE_FROM,
  REGEX_WHITE_SPACE_TO,
  REGEX_OTHER_SELECTOR,
  REGEX_ZERO_PREFIX,
  REGEX_BY_ZERO,
  REGEX_URL,
};
