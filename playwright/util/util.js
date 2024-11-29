const chalk = require('chalk');

class Scenario {

  constructor(page, name, browser) {
    this.page = page;
    this.name = name;
    this.browser = browser;
    this.resultsFolder = name;
    this.counter = 0;
  }

  async screenshot() {
    
    this.counter = this.counter + 1;
    let counterValue = this.counter.toString().padStart(3, "0");
    let imageName = `screenshot_${counterValue}.png`;
    await this.page.screenshot({path: `test-results/${this.resultsFolder}/${this.browser}/${imageName}`});
  }

  getPage() {

    return this.page;
  }

  begin() {

    console.log(chalk.blue(`Scenario: ${this.name}, Browser: ${this.browser.toUpperCase()}, Status: RUNNING.`));
  }

  successful() {

    console.log(chalk.green(`Scenario: ${this.name}, Browser: ${this.browser.toUpperCase()}, Status: SUCCESSFUL.`));
  }
}

module.exports = {

    Scenario    
}