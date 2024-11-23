const { EditPreviewPagePage } = require('./edit_preview_page_page.js');

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
            backButton: '[data-test-link="pages"]',
            errorAlert: '.gh-alert.gh-alert-red',
            leaveButton: '.gh-btn.gh-btn-red',
            markdownButton: 'button[aria-label="Add a card"]',
            buttonMarkdownPageButton: 'button[data-kg-card-menu-item="Button"]',
            buttonInputText: '[data-testid="button-input-text"]',
            buttonInputUrl: '[data-testid="button-input-url"]'
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

    async goBackAndLeave(){
        await this.scenario.getPage().locator(this.selectors.backButton).click();
        await this.waitForLoad();
        await this.scenario.screenshot();
        await this.scenario.getPage().locator(this.selectors.leaveButton).click();
        await this.waitForLoad();
        await this.scenario.screenshot();
    }

    async createPage(title, description, interrupt = false,invalid = false,empty = false, button = false) {
        try {
            const editPreviewPage = new EditPreviewPagePage(this.scenario);
            if (interrupt) {
                
                if (invalid) {
                    await this.fillTitle(title);
                    await this.fillDescription(description);
                    await this.goBackAndLeave()

                }
                else {

                await this.fillTitle(title);
                await this.fillDescription(description);
                await this.goBack()

                }
            } else {
                if (invalid) {
                    await this.fillTitle("test");
                    await this.fillDescription("test");
                    await editPreviewPage.changeTitle(title);
                    await editPreviewPage.changeDescription(description);
                    await this.scenario.getPage().locator(this.selectors.publishButton).first().click();
                    await this.waitForLoad();
                }
                else {
                    if (empty){

                        await this.fillTitle("test");
                        await this.fillDescription("test");
                        await editPreviewPage.changeTitle(title);
                        await editPreviewPage.changeDescription(description);
                        await this.publishPage();
                        await this.waitForLoad();

                    }
                    else {

                        if (button){

                            await this.fillTitle(title);
                            await this.fillDescription(description);
                            await this.scenario.getPage().keyboard.press('Enter');
                            

                        }
                        else {

                        await this.fillTitle(title);
                        await this.fillDescription(description);
                        await this.publishPage();
                        await this.waitForLoad();
                    }

                    }
                
                }
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

    async fillUrlButton(url){
        await this.scenario.getPage().locator(this.selectors.buttonInputUrl).fill(url)
        await this.scenario.screenshot();
    }

    async fillButton(text,url) {
        await this.scenario.getPage().locator(this.selectors.markdownButton).click()
        await this.scenario.screenshot();
        await this.scenario.getPage().locator(this.selectors.buttonMarkdownPageButton).click()
        await this.scenario.screenshot();
        await this.scenario.getPage().locator(this.selectors.buttonInputText).fill(text);
        await this.scenario.screenshot();
        await this.fillUrlButton(url);
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
        if (title === ""){
            const title = "(Untitled)"; 
        }
        const modalTitle = await this.scenario.getPage().locator(this.selectors.modalTitle).innerText();
        await this.scenario.screenshot();
        return modalTitle === title;
        
    }

    async verifyDescriptionInModal(description) {
        const modalDescription = await this.scenario.getPage().locator(this.selectors.postExcerpt).innerText();
        await this.scenario.screenshot();
        return modalDescription === description;
        
    }
    async getErrorMessage() {
        const errorElement = await this.scenario.getPage().locator(this.selectors.errorAlert);
        await errorElement.waitFor({ state: 'visible', timeout: 5000 });
        const errorText = await errorElement.innerText();
        await this.scenario.screenshot();
        return errorText === "Validation failed: Title cannot be longer than 255 characters.";
    }
}