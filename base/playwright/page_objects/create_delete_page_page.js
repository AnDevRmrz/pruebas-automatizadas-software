exports.CreateDeletePagePage = class CreateDeletePagePage {
  constructor(scenario) {
    this.scenario = scenario;
    this.selectors = {
      titleInput: 'textarea[placeholder="Page Title"]',
      descriptionInput: 'p[data-koenig-dnd-droppable="true"]',
      publishMenuButton: 'div[class="gh-publishmenu ember-view"] div',
      publishButton: ".gh-publishmenu-button",
      settingsButton: 'button[title="Settings"]',
      deleteButton: ".settings-menu-delete-button",
      confirmButton: 'button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]',
    };
  }

  async waitForLoad(ms = 1000) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createPage(title, description) {
    try {
      await this.fillTitle(title);
      await this.fillDescription(description);
      await this.publishPage();
      await this.waitForLoad();
    } catch (error) {
      throw new Error(`Failed to create page: ${error.message}`);
    }
  }

  async fillTitle(title) {
    await this.scenario
      .getPage()
      .locator(this.selectors.titleInput)
      .fill(title);
    await this.scenario.screenshot();
  }

  async fillDescription(description) {
    await this.scenario
      .getPage()
      .locator(this.selectors.descriptionInput)
      .first()
      .fill(description);
    await this.scenario.screenshot();
  }

  async publishPage() {
    await this.scenario
      .getPage()
      .locator(this.selectors.publishMenuButton)
      .first()
      .click();
    await this.waitForLoad();
    await this.scenario
      .getPage()
      .locator(this.selectors.publishButton)
      .click({ force: true });
    await this.scenario.screenshot();
  }

  async deletePage() {
    this.scenario
      .getPage()
      .locator(this.selectors.settingsButton)
      .first()
      .click();
      await this.waitForLoad();
    await this.scenario.screenshot();

    this.scenario
      .getPage()
      .locator(this.selectors.deleteButton)
      .first()
      .click();
      await this.waitForLoad();
    await this.scenario.screenshot();

    this.scenario
      .getPage()
      .locator(this.selectors.confirmButton)
      .first()
      .click();
      await this.waitForLoad();
    await this.scenario.screenshot();
  }
};
