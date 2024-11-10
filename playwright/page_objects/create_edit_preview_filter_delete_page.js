exports.CreateEditPreviewFilterDeletePage = class CreateEditPreviewFilterDeletePage {


    constructor(page) {
        this.page = page;
        this.titleInput = page.locator('[data-test-editor-title-input]');
        this.descriptionInput = page.locator('.kg-prose');
        this.publishButton = page.locator('[data-test-button="publish-flow"]');
        this.finalReviewButton = page.locator('[data-test-button="continue"]');
    }

    async goto() {
        await this.page.goto("http://localhost:3002/ghost/#/editor/post");
        await new Promise((r) => setTimeout(r, 1000));
      }

    async createPage(title, description) {

    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.publishButton.click();
    await this.finalReviewButton.click();
    await new Promise(r => setTimeout(r, 1000));
    }

}
