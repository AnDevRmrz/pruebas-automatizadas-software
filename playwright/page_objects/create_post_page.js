const { expect } = require("@playwright/test");

exports.CreateEditPostPage = class CreateEditPostPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.postTitleInput = scenario
      .getPage()
      .locator(
        "div[class='gh-editor-title-container'] textarea[class='gh-editor-title  ember-text-area gh-input ember-view']"
      );
    this.postContentInput = scenario.getPage().locator(".kg-prose").first();
    this.excerptInput = scenario.getPage().locator("#custom-excerpt").first();
    this.publishButton = scenario
      .getPage()
      .locator('[data-test-button="publish-flow"]')
      .first();
    this.settingsButton = scenario
      .getPage()
      .locator('button[title="Settings"]')
      .first();
    this.alertError = scenario
      .getPage()
      .locator("div[class=gh-alert-content]")
      .first();
    this.leaveButton = scenario
      .getPage()
      .locator("button[data-test-leave-button]");
  }

  async goToNew() {
    await this.scenario
      .getPage()
      .goto("http://localhost:3002/ghost/#/editor/post");
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async savePost(post, expectedError = false) {
    await this.postTitleInput.fill(" ");
    await this.postContentInput.fill(" ");
    await this.postTitleInput.fill(post.title);
    await this.postContentInput.fill(post.content);

    if (post.excerpt) {
      this.settingsButton.click();
      await this.excerptInput.fill(post.excerpt);
    }

    await this.publishButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();

    if (!expectedError) {
      let continueButton = this.scenario
        .getPage()
        .locator('button[data-test-button="continue"]');
      await continueButton.click();
      await new Promise((r) => setTimeout(r, 1000));
      await this.scenario.screenshot();

      let confirmPublishButton = this.scenario
        .getPage()
        .locator("button[data-test-button='confirm-publish']");
      await confirmPublishButton.click({ force: true });
      await new Promise((r) => setTimeout(r, 1000));
      await this.scenario.screenshot();
    }
  }

  async updatePost(post) {
    await this.postTitleInput.fill(" ");
    await this.postContentInput.fill(" ");
    await this.postTitleInput.fill(post.title);
    await this.postContentInput.fill(post.content);

    if (post.excerpt) {
      this.settingsButton.click();
      await this.excerptInput.fill(post.excerpt);
    }

    let updateButton = this.scenario
      .getPage()
      .locator("button[data-test-button='publish-save']")
      .first();
    await updateButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }

  async checkErrorAlert(errorText) {
    await this.alertError.waitFor({ timeout: 500 });
    const textAlertError = await this.alertError.innerText();
    expect(textAlertError === errorText).toBeTruthy();
    await this.scenario.screenshot();
  }

  async confirmLeave() {
    await this.leaveButton.waitFor({ timeout: 500 });
    await this.leaveButton.click();
    await new Promise((r) => setTimeout(r, 1000));
    await this.scenario.screenshot();
  }
};
