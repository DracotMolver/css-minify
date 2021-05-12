const expect = require('chai').expect;

const {
  hasMediaQuerySelector,
  hasOtherSelectors,
  hasCalcFunction,
  hasPlusSelector,
  hasAllSelector,
} = require('../../helpers/has');

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

  it('hasPlusSelector should return true or false', () => {
    const css_01 = `
      p + a {
        background-color: yellow;
      }
      div + .class {
        background-color: yellow;
      }
      element { 
        box-sizing: content-box;
        margin: calc(0 + 100%);
      }
    `;

    expect(hasPlusSelector(css_01)).to.be.true;

    const css_02 = `
      a[href*="w3schools"] {
        margin: calc(0 + 100%);
        width: calc(20px * (100% / 3) + 20px);
      }
    `;

    expect(hasPlusSelector(css_02)).to.be.false;
  });

  it('hasMediaQuerySelector should return true or false', () => {
    const css_01 = `
      @media only screen and (min-width:375px){}
      @media(max-width:600px){}
      @media(min-width:700px) and (orientation:landscape){}
      @media tv and (min-width:700px) and (orientation:landscape){}
      @media(min-width:700px),handheld and (orientation:landscape){}
      @media not all and (monochrome){}
      @media not (all and (monochrome)){}
      @media not screen and (color),print and (color){}
    `;

    expect(hasMediaQuerySelector(css_01)).to.be.true;

    const css_02 = `
      #aptApp *{
        box-sizing:content-box;
        @import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
      }
    `;

    expect(hasMediaQuerySelector(css_02)).to.be.false;
  });

  it('hasCalcFunction should return true or false', () => {
    const css_01 = `
      .class {
        margin: calc(0px + 100%);
        margin: calc(0px + 100%);
        margin: calc(0px * 100%);
        margin: calc(0px / 100%);
        margin: calc(0px - 100%);
        margin: calc(0px % 100%);
        width: calc((100% / 3) - 20px);
        width: calc(20px + (100% / 3) - 20px);
        width: calc(20px * (100% / 3) / 20px);
      }
    `;

    expect(hasCalcFunction(css_01)).to.be.true;

    const css_02 = `
      #aptApp *{
        box-sizing:content-box;
        @import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
      }
    `;

    expect(hasCalcFunction(css_02)).to.be.false;
  });

  it('hasOtherSelectors should return true or false', () => {
    const css_01 = `
      body:not(.logged-in)     .greeting{}
      :not(p),
      p:lang(it)
       {
        margin: 25px;
      }
    `;

    expect(hasOtherSelectors(css_01)).to.be.true;

    const css_02 = `
      .my-form[disabled=true] .my-input,
      p:last-child,
      p:first-child,
      p:nth-child(2),
      p:only-child,
      p:nth-last-child(2),
      [lang|=en] {
        cursor: not-allowed;
      }
      @media not all and (monochrome) {}
      @media not (all and (monochrome)) {}
      @media not screen and (color), print and (color) {}
    `;

    expect(hasOtherSelectors(css_02)).to.be.false;
  });
});
