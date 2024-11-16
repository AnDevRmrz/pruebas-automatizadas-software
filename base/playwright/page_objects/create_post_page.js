exports.CreateEditPostPage = class CreateEditPostPage {

    constructor(scenario) {
      this.scenario = scenario;
      this.postTitleInput = scenario.getPage().locator('textarea[placeholder="Post Title"]');
      this.postContentInput = scenario.getPage().locator('p[data-koenig-dnd-droppable="true"]');
      this.publishMenu = scenario.getPage().locator('div[class="gh-publishmenu ember-view"] div').first();
      this.publishButton = scenario.getPage().locator('.gh-publishmenu-button').first();
      this.settingsButton = scenario.getPage().locator('button[title="Settings"]').first();
      this.deleteButton = this.scenario.getPage().locator(".settings-menu-delete-button");
      this.confirmButton = this.scenario.getPage().locator('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    }
  
    async goToNew() {
      await this.scenario.getPage().goto("http://localhost:3002/ghost/#/editor/post");    
      await new Promise((r) => setTimeout(r, 1000));
      await this.scenario.screenshot();
    }
  
    async savePost(title, content) {
  
      await this.postTitleInput.fill(title);
      await this.postContentInput.fill(content);
      await this.publishMenu.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();

      await this.publishButton.click();
      await new Promise(r => setTimeout(r, 1000));      
      await this.scenario.screenshot();
    }

    async deletePost() {
  
      await this.settingsButton.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();
      
      await this.deleteButton.click();
      await new Promise(r => setTimeout(r, 1000));
      await this.scenario.screenshot();
      
      await this.confirmButton.click();      
    }
    
  };
  