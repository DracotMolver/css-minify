const path = require('path');
const { runTests, downloadAndUnzipVSCode } = require('vscode-test');

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../');

    const testWorkspace = path.resolve(__dirname, './suite/fixture');

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Version
    const version = '1.42.0';

    // Manually download version
    const vscodeExecutablePath = await downloadAndUnzipVSCode(version);

    // Download VS Code, unzip it and run the integration test
    await runTests({
      vscodeExecutablePath,
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        testWorkspace,
        // This disables all extensions except the one being testing
        '--disable-extensions'
      ]
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
