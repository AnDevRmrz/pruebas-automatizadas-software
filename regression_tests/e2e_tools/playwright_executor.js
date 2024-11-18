const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const DELETE_CONTENT_FOLDER = "rm -rf ./*";
const PLAYWRIGHT_COMMAND = "node regression.js ";

let screenshotsRC = [];
let screenshotsBase = [];

function executePlaywright(functionToCall, callback) {

  let resolveCallback = () => {
    callback(getResult());
  }

  let screenshotBase = () => {
    getScreenshots("base", resolveCallback);
  };  

  let screenshotRc = () => {
    getScreenshots("rc", screenshotBase);
  };

  let rcExecution = () => {
    executeSteps(functionToCall, "rc", screenshotRc);
  };
  executeSteps(functionToCall, "base", rcExecution);
}

function executeSteps(functionToCall, version, callback) {

  currentVersion = version;

  cleanResults();

  executeTestScenario(functionToCall, callback);
  
}

function cleanResults() {
  let directory = `../${currentVersion}/playwright/test-results/`;

  let absolutePath = path.resolve(directory);

  exec(DELETE_CONTENT_FOLDER, {cwd: absolutePath}, (err, stdout, stderr) => {
 
    if (err) {
        
      console.log(`error: ${err.message}`);
      return;
    }    
  });
}

function executeTestScenario(functionToCall, callback) {  

  let directory = `../${currentVersion}/playwright`;

  let absolutePath = path.resolve(directory);

  exec(PLAYWRIGHT_COMMAND+" "+functionToCall, {cwd: absolutePath}, (err, stdout, stderr) => {
 
    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }

    callback();
  });
}

function getScreenshots(version, callback) {

  let directory = `../${version}/playwright/test-results`;

  fs.readdir(directory, (err, files) => {
      
      let absolutePath = path.resolve(directory, files[0]);

      fs.readdir(absolutePath, (err, screenshots) => {

          let result = [];

          screenshots.forEach(screenshot => {
              result.push(path.resolve(absolutePath, screenshot));
          });

          result.sort((a, b) => {
            const numA = parseInt(a.match(/screenshot_(\d+)/)[1]);
            const numB = parseInt(b.match(/screenshot_(\d+)/)[1]);
            return numA - numB;
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
  executePlaywright
};