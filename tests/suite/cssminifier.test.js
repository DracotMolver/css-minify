const assert = require('assert');
const path = require('path');
const Minifier = require('../../cssMinifier.js');
const Mock = require('./fixture/mocks');

const {
  workspace,
  window,
  Uri
} = require('vscode');


xdescribe('cssMinifier functions', () => {
  const LANGUAGE = 'css';
  let workingOnSpace;

  const minifier = new Minifier();

  beforeEach(done => {
    workspace.openTextDocument(Uri.file(path.resolve(__dirname, './fixture/style.css')))
      .then(doc => {
        workingOnSpace = window.showTextDocument(doc);
        done();
      }, () => {
        done();
      });
  });

  // -- functions --
  function checkAssert(expected) {
    minifier.cssContent.forEach((content, index) => {
      assert(content === expected[index]);
    });
  }

  function trimValues(texts) {
    return texts.split('\n').map(text => text.trim());
  }

  // -- tests --

  it('Class Minifier is instantiated', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        assert(minifier instanceof Minifier);
        done();
      }
    }, () => {
      done();
    });
  });

  it('Replaces hexadecimal values by its shorten form', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(Mock.hexadecimal.init.split('\n'));
        minifier.replaceFullHexadecimalByShorten();

        checkAssert(trimValues(Mock.hexadecimal.expected));
        done();
      }
    }, () => {
      done();
    });
  });

  it('Replaces zero prefix from float values', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(Mock.floatValue.init.split('\n'));
        minifier.cleanZeroPrefixFloat();

        checkAssert(trimValues(Mock.floatValue.expected));
        done();
      }
    }, () => {
      done();
    });
  });

  it('Replaces zero units by zero', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(Mock.unitWithZero.init.split('\n'));
        minifier.cleanUnitsZeroValue();

        checkAssert(trimValues(Mock.unitWithZero.expected));
        done();
      }
    }, () => {
      done();
    });
  });

  it('Removes white spaces', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(Mock.whiteSpaces.init.split('\n'));
        minifier.cleanWhiteSpace();

        checkAssert(trimValues(Mock.whiteSpaces.expected));

        done();
      }
    }, () => {
      done();
    });
  });

  it('Removes single and double quotes', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(Mock.quotes.init.split('\n'));
        minifier.cleanQuotes();

        checkAssert(trimValues(Mock.quotes.expected));
        done();
      }
    }, () => {
      done();
    });
  });

  it('Replace NONE by 0', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(Mock.none.init.split('\n'));
        minifier.replaceNoneByZero();

        checkAssert(trimValues(Mock.none.expected));
        done();
      }
    }, () => {
      done();
    });
  });

  it('Minify the css file', done => {
    workingOnSpace.then(() => {
      if (window.activeTextEditor.document.languageId === LANGUAGE) {
        minifier.setContent(window.activeTextEditor.document.getText().split('\n'));
        minifier.replaceFullHexadecimalByShorten();
        minifier.cleanWhiteSpace();
        minifier.cleanUnitsZeroValue();
        minifier.cleanZeroPrefixFloat();
        minifier.replaceNoneByZero();
        minifier.cleanQuotes();

        minifier.getMinifiedCSS()
          .then(modifiedContent => {
            assert(modifiedContent === Mock.minifiedCSS);
            done();
          }, () => {
            done();
          });
      }
    }, () => {
      done();
    });
  });

  // issues tests
  describe('Reported issues', () => {
    it('wrong minifying :hover when appends :not() #12', done => {
      const content = [
        'header nav ul li:not(.nohover):hover ul { }',
        'div.guide p:not(.guideintro):not(.nonumber):nth-child(even):before,',
        'div.guide p:not(.guideintro):not(.nonumber):nth-child(odd):before { }'
      ];

      const expect = 'header nav ul li:not(.nohover):hover ul{}div.guide p:not(.guideintro):not(.nonumber):nth-child(even):before,div.guide p:not(.guideintro):not(.nonumber):nth-child(odd):before{}';

      minifier.setContent(content);
      minifier.replaceFullHexadecimalByShorten();
      minifier.cleanWhiteSpace();
      minifier.cleanUnitsZeroValue();
      minifier.cleanZeroPrefixFloat();
      minifier.replaceNoneByZero();
      minifier.cleanQuotes();

      minifier.getMinifiedCSS()
        .then(modifiedContent => {
          assert(modifiedContent === expect);
          done();
        }, () => {
          done();
        });
    });
  });
});
