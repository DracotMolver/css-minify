const expect = require('chai').expect;

const { hasAllSelector } = require('../../helpers/has');

describe('has functions', () => {
  it('hasAllSelector should return true or false', () => {
    const css_01 = `
      * {
        background-color: yellow;
      }
      div * {
        background-color: yellow;
      }
      #aptApp * {
        box-sizing: content-box;
        @import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
      }
    `;

    expect(hasAllSelector(css_01)).to.be.true;

    const css_02 = `
      a[href*="w3schools"] {
        background-color: yellow;
        width: calc(20px * (100% / 3) / 20px);
      }
    `;

    expect(hasAllSelector(css_02)).to.be.false;
  });
});
