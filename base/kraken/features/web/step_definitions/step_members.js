const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

When("I click in members main option", async function () {
  let element = await this.driver.$('a[href="#/members/"]');
  return await element.click();
});

When("I click in new member button", async function () {
  let element = await this.driver.$('a[href="#/members/new/"]'); 
  return await element.click();
});

When("I type in the member name field {string}", async function (memberName) {
  let element = await this.driver.$("#member-name");
  return await element.setValue(memberName);
});

When("I type in the email field {string}", async function (memberEmail) {
  let element = await this.driver.$("#member-email");
  return await element.setValue(memberEmail);
});

When("I click in the save member button", async function () {
  let element = await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
  return await element.click();
});

Then(
  "I can see in the member row the member name {string} and member email {string}",
  async function (memberName, memberEmail) {
    let rowElements = await this.driver.$$('div[class="w-80"]');
    let elementFound = false;
    for (const row of rowElements) {
      const name = await row.$("h3").getText();
      const email = await row.$("p").getText();
      console.log("name: " + name + " email: " + email);
      if (name === memberName && email === memberEmail) {
        elementFound = true;
        break;
      }
    }
    assert.equal(elementFound, true);
  }
);

Then("I go to members", async function () {
  let element = await this.driver.$('a[href="#/members/"]');
  return await element.click();
});