const fs = require("fs");
const { executeKraken } = require("./e2e_tools/kraken_executor");
const { executePlaywright } = require("./e2e_tools/playwright_executor");
const path = require("path");
const {outputResult} = require("./regression_tools/dummy_regression_tool");

const KRAKEN_ID = 1;
const RESEMBLE_JS_ID = 1;

function executeTestScenario(scenario, e2eTool, callback) {

  if (e2eTool.id === KRAKEN_ID) {
    executeKraken(scenario.krakenFeature, callback);
  } else {
    executePlaywright(scenario.playwrightFunction, callback);
  }
}

function executeRegressionComparison(scenario, e2eTool, regressionTool, screenshots) {

  let result = prepareInputToGenerateRegressionTests(scenario, e2eTool, regressionTool, screenshots);

  if(regressionTool.id === RESEMBLE_JS_ID) {

    outputResult(result);
  }
  else
  {
    outputResult(result);
  }
}

function prepareInputToGenerateRegressionTests(scenario, e2eTool, regressionTool, screenshots) {

  let maxLength = Math.max(screenshots.screenshotsBase.length, screenshots.screenshotsRC.length);

  let resultFolder = `/regression-results/${new Date().valueOf()}_${scenario.name}_${e2eTool.name}_${regressionTool.name}`;

  let outputPath = path.resolve(__dirname)+resultFolder;

  fs.mkdirSync(outputPath, { recursive: true });

  let result = {
    imagesToCompare: [],
    outputResults: outputPath,
    scenarioToTest: scenario.name
  };

  for (let i = 0; i < maxLength; i++) {
    let baseScreenshot = "";
    let rcScreenshot = "";

    if (i < screenshots.screenshotsBase.length) {
      baseScreenshot = screenshots.screenshotsBase[i];
    } else {
      baseScreenshot = screenshots.screenshotsBase[screenshots.screenshotsBase.length - 1];
    }

    if (i < screenshots.screenshotsRC.length) {
      rcScreenshot = screenshots.screenshotsRC[i];
    } else {
      rcScreenshot = screenshots.screenshotsRC[screenshots.screenshotsRC.length - 1];
    }

    let imagesData = {
      base: baseScreenshot,
      rc: rcScreenshot,
    };

    result.imagesToCompare.push(imagesData);
  }

  return result;
}

module.exports = {
  executeTestScenario,
  executeRegressionComparison
};
