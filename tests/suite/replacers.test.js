const expect = require('chai').expect;

const { replaceAllSelector } = require('../../utils/replacers');

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
    expect(replaceAllSelector(css05)).to.equal(
      '#aptApp * a[href*="w3schools"]{',
    );

    const css08 = '#aptApp *      .class{';
    expect(replaceAllSelector(css02)).to.equal('#aptApp * .class{');

    const css09 = '#aptApp *     #test{';
    expect(replaceAllSelector(css03)).to.equal('#aptApp * #test{');

    const css10 = 'width: calc(100%  *    (100px) 10px)';
    expect(replaceAllSelector(css10)).to.equal('width: calc(100% * (100px) 10px)');
  });
});
