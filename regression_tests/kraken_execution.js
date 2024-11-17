const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const SIGN_UP_FEATURE = "000_sign_up.feature";
const KRAKEN_COMMAND = "./node_modules/kraken-node/bin/kraken-node run";

let currentVersion = null;

function init(featureToExecute, callback) {
  let rcExecution = () => {
    executeSteps(featureToExecute, "rc", callback);
  };
  executeSteps(featureToExecute, "base", rcExecution);
}

function executeSteps(featureToExecute, version, callback) {
  currentVersion = version;

  cleanReports();

  let cleanAndRunTheNextFeature = () => {
    cleanReports();
    copyFeatureToExecute(featureToExecute, callback());
  };

  let executeSignUp = () => {
    executeTestCase(cleanAndRunTheNextFeature);
  };

  copyFeatureToExecute(SIGN_UP_FEATURE, executeSignUp);
}

function cleanReports() {
  let directory = `../${currentVersion}/kraken/reports/`;

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

function copyFeatureToExecute(featureToExecute, callback) {
  const srcFile = `../${currentVersion}/kraken/features/test-cases/${featureToExecute}`;
  const destFile = `../${currentVersion}/kraken/features/000_featureToExecute.feature`;

  fs.copyFile(srcFile, destFile, (err) => {
    if (err) {
      console.log("Error Found:", err);
      return;
    }

    callback();
  });
}

function executeTestCase(callback) {  

  let directory = `../${currentVersion}/kraken`;

  let absolutePath = path.resolve(directory);

  exec(KRAKEN_COMMAND, {cwd: absolutePath}, (err, stdout, stderr) => {
 
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    callback();
  });
}

module.exports = {
  init,
};
