const {executeKraken} = require("./kraken_executor");
const {executePlaywright} = require("./playwright_executor");

const KRAKEN_ID = 1;


function executeTestScenario(scenario, e2eTool, callback) {

    if(e2eTool.id === KRAKEN_ID) {

        executeKraken(scenario.krakenFeature, callback);
    }
    else {

        executePlaywright(scenario.playwrightFunction, callback);
    }
}

module.exports = {
    executeTestScenario
};
  