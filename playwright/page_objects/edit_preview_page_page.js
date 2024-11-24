class EditPreviewPagePage {
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
            pagePreviewDescription: '.gh-content p',
            settingsButton: 'button.settings-menu-toggle[title="Settings"]',
            viewPageButton: '.post-view-link',
            errorAlert: '.gh-alert.gh-alert-red',
            buttonText: '.kg-card.kg-button-card a.kg-btn.kg-btn-accent'
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

    async verifyTextButton(expectedText) {
        try {
            await this.waitForLoad(2000);
            
            const textElement = this.scenario.getPage().locator(this.selectors.buttonText);
            await textElement.waitFor({ state: 'visible', timeout: 5000 });
            
            const actualText = await textElement.textContent();
            
            return actualText.trim() === expectedText.trim();
        } catch (error) {
            console.error('Error verifying button text:', error);
            console.error('Selector usado:', this.selectors.buttonText);
            console.error('Expected text was:', expectedText);
            throw error;
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
    
            return new EditPreviewPagePage(this.scenario);
        } catch (error) {
            console.error("Error al intentar ver la página:", error);
            throw new Error(`No se pudo ver la página: ${error.message}`);
        }
    }

    async getUpdateErrorMessage() {
        const errorElement = await this.scenario.getPage().locator(this.selectors.errorAlert);
        await errorElement.waitFor({ state: 'visible', timeout: 5000 });
        const errorText = await errorElement.innerText();
        await this.scenario.screenshot();
        return errorText === "Update failed: Title cannot be longer than 255 characters.";
    }

    
}

module.exports = { EditPreviewPagePage };