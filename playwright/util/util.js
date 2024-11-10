const chalk = require('chalk');

class Scenario {

  constructor(page, name) {
    this.page = page;
    this.name = name;
    this.resultsFolder = name+"_"+new Date().valueOf();
    this.counter = 0;
  }

  async screenshot() {

    this.counter = this.counter + 1;
    let imageName = `screenshot_${this.counter}.png`;
    await this.page.screenshot({path: `test-results/${this.resultsFolder}/${imageName}`});
  }

  getPage() {

    return this.page;
  }

  begin() {

    console.log(chalk.blue(`Scenario: ${this.name}, Status: RUNNING.`));
  }

  successful() {

    console.log(chalk.green(`Scenario: ${this.name}, Status: SUCCESSFUL.`));
  }
}

module.exports = {

    Scenario    
}