exports.CreatePagePage = class CreatePagePage {
    constructor(scenario) {
        this.scenario = scenario;
        this.selectors = {
            titleInput: '[data-test-editor-title-input]',
            descriptionInput: 'div.kg-prose p[data-koenig-dnd-droppable="true"]',
            publishButton: '[data-test-button="publish-flow"]',
            finalReviewButton: '[data-test-button="continue"]',
            confirmPublishButton: '[data-test-button="confirm-publish"]',
            closePublishButton: '[data-test-button="close-publish-flow"]',
            modalTitle: '.modal-body h2',
            postExcerpt: '.post-excerpt',
            backButton: '[data-test-link="pages"]'
        };
    }

    async goto() {
        await this.scenario.getPage().goto("http://localhost:3002/ghost/#/editor/post");
        await this.waitForLoad();
    }

    async waitForLoad(ms = 1000) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    async goBack() {
        try {
            await this.scenario.getPage().locator(this.selectors.backButton).click();
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to go back: ${error.message}`);
        }
    }

    async createPage(title, description, interrupt = false) {
        try {
            if (interrupt) {
                // Si interrupt es true, solo llenamos los campos sin publicar
                await this.fillTitle(title);
                await this.fillDescription(description);
                await this.goBack()
            } else {
                // Si interrupt es false, completamos todo el proceso
                await this.fillTitle(title);
                await this.fillDescription(description);
                await this.publishPage();
                await this.waitForLoad();
            }
        } catch (error) {
            throw new Error(`Failed to create page: ${error.message}`);
        }
    }

    async fillTitle(title) {
        await this.scenario.getPage().locator(this.selectors.titleInput).fill(title);
        await this.scenario.screenshot();
    
    }

    async fillDescription(description) {
        await this.scenario.getPage().locator(this.selectors.descriptionInput).first().fill(description);
        await this.scenario.screenshot();
    }

    async publishPage() {
        await this.scenario.getPage().locator(this.selectors.publishButton).first().click();
        await this.waitForLoad();
        await this.scenario.getPage().locator(this.selectors.finalReviewButton).click();
        await this.waitForLoad();
        await this.scenario.getPage().locator(this.selectors.confirmPublishButton).click({ force: true });
        await this.scenario.screenshot();
    }

    async closePublishFlow() {
        await this.scenario.getPage().locator(this.selectors.closePublishButton).click();
        await this.scenario.screenshot();
    }

    async verifyTitleInModal(title) {
        const modalTitle = await this.scenario.getPage().locator(this.selectors.modalTitle).innerText();
        await this.scenario.screenshot();
        return modalTitle === title;
        
    }

    async verifyDescriptionInModal(description) {
        const modalDescription = await this.scenario.getPage().locator(this.selectors.postExcerpt).innerText();
        await this.scenario.screenshot();
        return modalDescription === description;
        
    }
}