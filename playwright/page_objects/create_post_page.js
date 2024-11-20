exports.CreateEditPostPage = class CreateEditPostPage {

    constructor(scenario) {
      this.scenario = scenario;
      this.postTitleInput = scenario.getPage().locator("div[class='gh-editor-title-container'] textarea[class='gh-editor-title  ember-text-area gh-input ember-view']");
      this.postContentInput = scenario.getPage().locator(".kg-prose").first();
      this.publishButton = scenario.getPage().locator('[data-test-button="publish-flow"]').first();
      this.settingsButton = scenario.getPage().locator('button[title="Settings"]').first();
    }
  
    async goToNew() {
      await this.scenario.getPage().goto("http://localhost:3002/ghost/#/editor/post");    
      await new Promise((r) => setTimeout(r, 1000));
      await this.scenario.screenshot();
    }
  
    async savePost(title, content) {
  
      await this.postTitleInput.fill(title);
      await this.postContentInput.fill(content);
      await this.publishButton.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();

      let continueButton = this.scenario.getPage().locator('button[data-test-button="continue"]');
      await continueButton.click();
      await new Promise(r => setTimeout(r, 1000));      
      await this.scenario.screenshot();

      let confirmPublishButton = this.scenario.getPage().locator("button[data-test-button='confirm-publish']");
      await confirmPublishButton.click({ force: true });
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();
    }

    async updatePost(title, content) {

      await this.postTitleInput.fill(title);
      await this.postContentInput.fill(content);
      let updateButton = this.scenario.getPage().locator("button[data-test-button='publish-save']").first();
      await updateButton.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();
    }
  
    async deletePost() {
  
      await this.settingsButton.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();
      
      let deleteButton = this.scenario.getPage().locator("button[data-test-button=delete-post]");
      await deleteButton.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();
      
      let confirmButton = await this.scenario.getPage().locator("button[data-test-button=delete-post-confirm]");
      await confirmButton.click();      
    }
    
  };
  