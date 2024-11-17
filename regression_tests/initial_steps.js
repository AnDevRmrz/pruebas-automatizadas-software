const { exec } = require("child_process");
const ghost_5_96_Command = "docker stop ghost_1 && docker rm ghost_1 && docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0";
const ghost_4_5_Command = "docker stop ghost_2 && docker rm ghost_2 && docker run -d --name ghost_2 -e NODE_ENV=development -e url=http://localhost:3003 -p 3003:2368 ghost:4.5";

function initGhostInstances() {

    restartGhost596();
}


function restartGhost596() {

    exec(ghost_5_96_Command, (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        // console.log(`stdout: ${stdout}`);
        console.log("Ghost 5.96 Restarted !!!");
        restartGhost45();
    });
}

function restartGhost45() {

    exec(ghost_4_5_Command, (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        // console.log(`stdout: ${stdout}`);
        console.log("Ghost 4.5 Restarted !!!");
    });
}

module.exports = {

    initGhostInstances
}