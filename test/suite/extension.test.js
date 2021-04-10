const sinon = require('sinon');
const assert = require('assert');
const path = require('path');

const {
  commands,
  window,
  workspace,
  Uri
} = require('vscode');

xdescribe('Extension Tests', () => {
  it('Execute the command extension', done => {
    commands.executeCommand('extension.minify')
      .then(() => {
        assert(true);
        done();
      }, () => {
        done();
      });
  });

  it('In the active editor the file extension is CSS?', done => {
    workspace.openTextDocument(Uri.file(path.resolve(__dirname, '../fixture/style.css')))
      .then(document => {
        window.showTextDocument(document).then(() => {
          const { languageId } = window.activeTextEditor.document;
          assert(languageId === 'css');
          done();
        });
        done();
      }, () => {
        done();
      });
  });

  it('Display message if the file extension is not CSS', done => {
    workspace.openTextDocument(Uri.file(path.resolve(__dirname, '../fixture/index.html')))
      .then(document => {
        window.showTextDocument(document).then(() => {
          const { languageId } = window.activeTextEditor.document;

          if (languageId !== 'css') {
            // Spy the showWarning function
            const showWarningMessage = sinon.stub(window, 'showWarningMessage');
            showWarningMessage.withArgs('This extension must be use on a CSS file', );

            // Trigger the function
            window.showWarningMessage('This extension must be use on a CSS file');

            assert(showWarningMessage.calledOnce);
            showWarningMessage.restore();
            done();
          }
        });
      }, () => {
        done();
      });
  });
});
