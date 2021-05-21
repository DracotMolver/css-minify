const expect = require('chai').expect;

const {
  replaceAllSelector,
  replacePlusSelector,
} = require('../../utils/replacers');

describe('Replacer functions', () => {
  it('replaceAllSelector', () => {
    const css01 = '#aptApp * {';
    expect(replaceAllSelector(css01)).to.equal('#aptApp *{');

    const css02 = '#aptApp * .class{';
    expect(replaceAllSelector(css02)).to.equal('#aptApp * .class{');

    const css03 = '#aptApp * #test{';
    expect(replaceAllSelector(css03)).to.equal('#aptApp * #test{');

    const css04 = 'width: calc(100% * 10px)';
    expect(replaceAllSelector(css04)).to.equal('width: calc(100% * 10px)');

    const css05 = '#aptApp *    a[href*="w3schools"]{';
    expect(replaceAllSelector(css05)).to.equal(
      '#aptApp * a[href*="w3schools"]{',
    );

    const css06 = '#aptApp *{';
    expect(replaceAllSelector(css06)).to.equal('#aptApp *{');

    const css07 = '#aptApp       *    a[href*="w3schools"]{';
    expect(replaceAllSelector(css07)).to.equal(
      '#aptApp * a[href*="w3schools"]{',
    );

    const css08 = '#aptApp *      .class{';
    expect(replaceAllSelector(css08)).to.equal('#aptApp * .class{');

    const css09 = '#aptApp *     #test{';
    expect(replaceAllSelector(css09)).to.equal('#aptApp * #test{');

    const css10 = 'width: calc(100%  *    (100px) 10px)';
    expect(replaceAllSelector(css10)).to.equal(
      'width: calc(100% * (100px) 10px)',
    );
  });

  it('replacePlusSelector', () => {
    const css01 = 'div+   p{';
    expect(replacePlusSelector(css01)).to.equal('div+p{');

    const css02 =
      '@import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");';
    expect(replacePlusSelector(css02)).to.equal(
      '@import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");',
    );

    const css03 = 'div    +p,';
    expect(replacePlusSelector(css03)).to.equal('div+p,');

    const css04 = 'width: calc(20px + (100% / 3) - 20px);';
    expect(replacePlusSelector(css04)).to.equal(
      'width: calc(20px + (100% / 3) - 20px);',
    );

    const css05 = 'div    +    p,';
    expect(replacePlusSelector(css05)).to.equal('div+p,');

    const css06 = 'margin: calc(0px + 100%);';
    expect(replacePlusSelector(css06)).to.equal('margin: calc(0px + 100%);');
  });
});
