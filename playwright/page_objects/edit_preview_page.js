class EditPreviewPageScenary {
    constructor(scenario) {
        this.scenario = scenario;
        this.selectors = {
            editorButton: '[title="Go to Editor"]',
            titleInput: '[data-test-editor-title-input]',
            descriptionInput: 'div.kg-prose p[data-koenig-dnd-droppable="true"]',
            updateButton: '[data-test-button="publish-save"]',
            backButton: '[data-test-link="pages"]',
            pageTitle: '.gh-content-entry-title',
            pagePreviewTitle: '.gh-article-title',
            pagePreviewDescription: '.gh-content',
            settingsButton: 'button.settings-menu-toggle[title="Settings"]',
            viewPageButton: '.post-view-link'
        };
    }
    

    setPage(newPage) {
        this.scenario.page = newPage;
    }

    async goToEditor() {
        try {
            await this.scenario.getPage().locator(this.selectors.editorButton).click();
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to navigate to editor: ${error.message}`);
        }
    }

    async changeTitle(title) {
        try {
            const titleElement = this.scenario.getPage().locator(this.selectors.titleInput);
            await titleElement.fill(title);
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to change title: ${error.message}`);
        }
    }

    async changeDescription(description) {
        try {
            const descElement = this.scenario.getPage().locator(this.selectors.descriptionInput);
            await descElement.first().click();
            
            // Simular Control+A para seleccionar todo el texto
            await this.scenario.getPage().keyboard.press('Control+A');
            
            // Borrar el contenido actual
            await this.scenario.getPage().keyboard.press('Backspace');
            
            // Escribir la nueva descripción
            await descElement.first().fill(description);
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to change description: ${error.message}`);
        }
    }

    async clickUpdate() {
        try {
            await this.scenario.getPage().locator(this.selectors.updateButton).first().click();
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to click update button: ${error.message}`);
        }
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

    async waitForLoad(ms = 1000) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    // Preview Page

    async verifyPreviewTitle(expectedTitle) {
        try {
            const titleElement = await this.scenario.getPage().locator(this.selectors.pagePreviewTitle);
            await titleElement.waitFor({ state: 'visible' });
            const actualTitle = await titleElement.innerText();
            return actualTitle === expectedTitle;
        } catch (error) {
            throw new Error(`Failed to verify preview title: ${error.message}`);
        }
    }

    async verifyPreviewDescription(expectedDescription) {
        try {
            const descElement = await this.scenario.getPage().locator(this.selectors.pagePreviewDescription);
            await descElement.waitFor({ state: 'visible' });
            const actualDescription = await descElement.innerText();
            return actualDescription === expectedDescription;
        } catch (error) {
            throw new Error(`Failed to verify preview description: ${error.message}`);
        }
    }

    async openSettings() {
        try {
            const settingsButton = this.scenario.getPage().locator(this.selectors.settingsButton);
            await settingsButton.waitFor({ state: 'visible' });
            await settingsButton.click();
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to open settings: ${error.message}`);
        }
    }
    
    async viewPage() {
        try {
            const viewButton = this.scenario.getPage().locator(this.selectors.viewPageButton);
    
            const [newPage] = await Promise.all([
                this.scenario.getPage().context().waitForEvent('page'),
                viewButton.click()
            ]);
    
            await newPage.waitForLoadState('domcontentloaded');
    
            this.setPage(newPage);
            
            await this.scenario.screenshot();
    
            return new EditPreviewPageScenary(this.scenario);
        } catch (error) {
            console.error("Error al intentar ver la página:", error);
            throw new Error(`No se pudo ver la página: ${error.message}`);
        }
    }
    
}

module.exports = { EditPreviewPageScenary };