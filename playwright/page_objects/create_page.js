exports.CreatePageScenary = class CreatePageScenary {
    constructor(page) {
        this.page = page;
        this.selectors = {
            titleInput: '[data-test-editor-title-input]',
            descriptionInput: 'div.kg-prose p[data-koenig-dnd-droppable="true"]',
            publishButton: '[data-test-button="publish-flow"]',
            finalReviewButton: '[data-test-button="continue"]',
            confirmPublishButton: '[data-test-button="confirm-publish"]',
            closePublishButton: '[data-test-button="close-publish-flow"]',
            modalTitle: '.modal-body h2',
            postExcerpt: '.post-excerpt'
        };
    }

    async goto() {
        await this.page.goto("http://localhost:3002/ghost/#/editor/post");
        await this.waitForLoad();
    }

    async waitForLoad(ms = 1000) {
        await new Promise(resolve => setTimeout(resolve, ms));
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
        await this.page.locator(this.selectors.titleInput).fill(title);
    }

    async fillDescription(description) {
        await this.page.locator(this.selectors.descriptionInput).first().fill(description);
    }

    async publishPage() {
        await this.page.locator(this.selectors.publishButton).first().click();
        await this.waitForLoad();
        await this.page.locator(this.selectors.finalReviewButton).click();
        await this.waitForLoad();
        await this.page.locator(this.selectors.confirmPublishButton).click({ force: true });
    }

    async closePublishFlow() {
        await this.page.locator(this.selectors.closePublishButton).click();
    }

    async verifyTitleInModal(title) {
        const modalTitle = await this.page.locator(this.selectors.modalTitle).innerText();
        return modalTitle === title;
    }

    async verifyDescriptionInModal(description) {
        const modalDescription = await this.page.locator(this.selectors.postExcerpt).innerText();
        return modalDescription === description;
    }
}