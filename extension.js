/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2021
 */

const { commands, window } = require('vscode');

const path = require('path');
const fs = require('fs');

const Minifier = require('./cssMinifier.js');

function activate(context) {
  const minifier = new Minifier();

  const disposable = commands.registerCommand('extension.minify', () => {
    const { activeTextEditor } = window;

    if (activeTextEditor.document.languageId === 'css') {
      const { document } = activeTextEditor;
      const content = document.getText().split('\n');
      const { fileName } = document;
      const filePath = path.dirname(fileName);
      const name = path.basename(fileName).replace('css', 'min.css');
      const savePath = path.join(filePath, name);

      minifier.setContent(content);
      // removes the exadecimal
      minifier.replaceFullHexadecimalByShorten();
      // removes the white spaces
      minifier.cleanWhiteSpace();
      // removes the zero values with units
      minifier.cleanUnitsZeroValue();
      // removes the zero prefix from float values
      minifier.cleanZeroPrefixFloat();
      // replace none by 0
      minifier.replaceNoneByZero();
      // removes single and double quotes
      minifier.cleanQuotes();

      minifier
        .getMinifiedCSS()
        .then((modifiedContent) => {
          fs.writeFile(savePath, modifiedContent, () => {
            window.showInformationMessage(
              `A minified file has been created with the name: ${name}`
            );
          });
        })
        .catch(window.showErrorMessage);
    } else {
      window.showWarningMessage('This extension must be use on a CSS file');
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
