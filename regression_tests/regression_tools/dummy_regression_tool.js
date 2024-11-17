const fs = require("fs");

function outputResult(result) {

  var file = result.outputResults+"/archivo.txt";

  fs.writeFile(file, 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

module.exports = {
  outputResult
};
