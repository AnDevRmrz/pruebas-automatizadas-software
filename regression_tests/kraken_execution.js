const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const SIGN_UP_FEATURE = "000_sign_up.feature";
const KRAKEN_COMMAND = "./node_modules/kraken-node/bin/kraken-node run";
const DELETE_CONTENT_FOLDER = "rm -rf ./*";

let currentVersion = null;
let screenshotsRC = [];
let screenshotsBase = [];

function init(featureToExecute, callback) {

  let screenshotBase = () => {
    getScreenshots("base", callback);
  };  

  let screenshotRc = () => {
    getScreenshots("rc", screenshotBase);
  };

  let rcExecution = () => {
    executeSteps(featureToExecute, "rc", screenshotRc);
  };
  executeSteps(featureToExecute, "base", rcExecution);
}

function executeSteps(featureToExecute, version, callback) {
  currentVersion = version;

  cleanReports();

  let executeFeature = () => {
    executeTestCase(callback);
  }

  let cleanAndRunTheNextFeature = () => {
    cleanReports();
    copyFeatureToExecute(featureToExecute, executeFeature);
  };

  let executeSignUp = () => {
    executeTestCase(cleanAndRunTheNextFeature);
  };

  copyFeatureToExecute(SIGN_UP_FEATURE, executeSignUp);
}

function cleanReports() {
  let directory = `../${currentVersion}/kraken/reports/`;

  let absolutePath = path.resolve(directory);

  exec(DELETE_CONTENT_FOLDER, {cwd: absolutePath}, (err, stdout, stderr) => {
 
    if (err) {
        
      console.log(`error: ${err.message}`);
      return;
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
 
    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }

    callback();
  });
}

function getScreenshots(version, callback) {

    let directory = `../${version}/kraken/reports`;

    fs.readdir(directory, (err, files) => {
        
        let absolutePath = path.resolve(directory, files[0])+"/screenshots";

        fs.readdir(absolutePath, (err, screenshots) => {

            let result = [];

            screenshots.forEach(screenshot => {
                
                result.push(path.resolve(absolutePath, screenshot));
            });

            if(version === "rc") {

                screenshotsRC = result;
            }
            else
            {
                screenshotsBase = result;
            }

            callback();
        });
    });
}

function getResult() {

    return {
        screenshotsRC: screenshotsRC,
        screenshotsBase: screenshotsBase
    }
}

module.exports = {
  init, getResult
};
