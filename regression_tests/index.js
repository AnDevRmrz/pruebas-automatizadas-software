const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const availableTestCases = require("./available_test_cases.json");
const availableE2ETools = require("./e2e_tools.json");
const availableRegressionTools = require("./regression_tools.json");
const {initGhostInstances} = require("./initial_steps");
const {init, getResult} = require("./kraken_execution");

const prompts = readline.createInterface(process.stdin, process.stdout);

let e2eTool = null;
let regressionTool = null;
let testCaseToExecute = null;

console.log(chalk.green("---------------------------------------------------------"));
console.log(chalk.green("Bienvenido a nuestra herramienta de pruebas de regresión."));
console.log(chalk.green("---------------------------------------------------------"));

chooseE2ETool();

function chooseE2ETool() {

    console.log("");
    console.log("");
    console.log(chalk.green("Elige la herramienta de E2E testing"));
    console.log("");

    for (let i = 0; i < availableE2ETools.length; i++) {
        
        console.log(chalk.blue(`${i+1}- ${availableE2ETools[i].name}`));
    }
    console.log("");

    prompts.question('Elige una opción \n', (response) => {

        if(response >= 1 && response <= availableE2ETools.length){

            e2eTool = availableE2ETools[response-1];
            chooseRegressionTool();
        }
        else
        {
            console.log("");
            console.log(chalk.red("Opción incorrecta"));
            chooseE2ETool();
        }
        
    });
}

function chooseRegressionTool() {

    console.log("");
    console.log("");
    console.log(chalk.green("Elige la herramienta de regression testing"));
    console.log("");

    for (let i = 0; i < availableRegressionTools.length; i++) {
        
        console.log(chalk.blue(`${i+1}- ${availableRegressionTools[i].name}`));
    }
    console.log("");

    prompts.question('Elige una opción \n', (response) => {

        if(response >= 1 && response <= availableRegressionTools.length){

            regressionTool = availableRegressionTools[response-1];
            chooseTestCase();
        }
        else
        {
            console.log("");
            console.log(chalk.red("Opción incorrecta"));
            chooseRegressionTool();
        }
        
    });
}

function chooseTestCase() {

    console.log("");
    console.log("");
    console.log(chalk.green("Elige el caso de uso a ejecutar"));
    console.log("");
    for (let i = 0; i < availableTestCases.length; i++) {
        
        console.log(chalk.blue(`${i+1}- ${availableTestCases[i].name}`));
    }
    console.log("");
    prompts.question('Elige una opción \n', (response) => {

        if(response >= 1 && response <= availableTestCases.length){

            testCaseToExecute = availableTestCases[response-1];
            confirmExecution();
        }
        else
        {
            console.log("");
            console.log(chalk.red("Opción incorrecta"));
            chooseTestCase();
        }
        
    });
}

function confirmExecution() {

    console.log("");
    console.log("");
    console.log(chalk.green("Confirmar ejecución"));
    console.log("");
    
    console.log(chalk.green("Herramienta E2E: ")+""+chalk.blue(e2eTool.name));
    console.log(chalk.green("Herramienta Regression: ")+""+chalk.blue(regressionTool.name));
    console.log(chalk.green("Herramienta Caso de prueba: ")+""+chalk.blue(testCaseToExecute.name));

    console.log("");

    prompts.question('¿Deseas continuar con la ejecución? Si(1) - No(2) \n', (response) => {

        if(response == 1){

            console.log("Iniciando ejecución....");
            // initGhostInstances();

            let showScreenShots = () => {

                var result = getResult();
                console.log("-----------------------------------------");
                console.log(result.screenshotsBase);
                console.log("-----------------------------------------");
                console.log(result.screenshotsRC);
                console.log("-----------------------------------------");
                process.exit();
            }

            init(testCaseToExecute.krakenFeature, showScreenShots);
        }
        else
        {
            chooseE2ETool();
        }
        
    });
}