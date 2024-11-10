class EditPageScenary {
    constructor(scenario) {
        this.scenario = scenario;
        this.selectors = {
            editorButton: '[title="Go to Editor"]',
            titleInput: '[data-test-editor-title-input]',
            descriptionInput: 'div.kg-prose p[data-koenig-dnd-droppable="true"]',
            updateButton: '[data-test-button="publish-save"]',
            backButton: '[data-test-link="pages"]',
            pageTitle: '.gh-content-entry-title'
        };
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
}

module.exports = { EditPageScenary };