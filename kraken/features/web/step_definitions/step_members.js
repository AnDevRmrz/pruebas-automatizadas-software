const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

When("I click in members main option", async function () {
  let element = await this.driver.$("a[data-test-nav=members]");
  return await element.click();
});

When("I click in new member button", async function () {
  let element = await this.driver.$("a[data-test-new-member-button=true]");
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
  let element = await this.driver.$("button[data-test-button=save]");
  return await element.click();
});

Then("I go to members", async function () {
  let element = await this.driver.$("a[data-test-nav=members]");
  return await element.click();
});

Then(
  "I can see in the member row the member name {string} and member email {string}",
  async function (memberName, memberEmail) {
    let rowElements = await this.driver.$$(
      "tr[data-test-list=members-list-item]"
    );
    let memberValues = await Promise.all(
      rowElements.map(async (value) => {
        const name = await value.$("h3").getText();
        const email = await value.$("p").getText();
        return name === memberName && email === memberEmail;
      })
    );
    assert.equal(memberValues.includes(true), true);
  }
);
