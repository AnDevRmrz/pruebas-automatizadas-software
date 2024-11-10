const { CreatePageScenary } = require("./create_page.js");

class ListPages {
    constructor(scenario) {
        this.scenario = scenario;
        this.selectors = {
            newPageButton: "[data-test-new-page-button]",
            pageListItem: "li.gh-posts-list-item-group",
            pageTitle: "h3.gh-content-entry-title",
            pageAttribute: "p.gh-content-entry-status",
        };
    }

    async goto() {
        try {
            await this.scenario.getPage().goto("http://localhost:3002/ghost/#/pages");
            await this.waitForLoad();
            await this.scenario.screenshot();
        } catch (error) {
            throw new Error(`Failed to navigate to pages: ${error.message}`);
        }
    }

    async waitForLoad(ms = 1000) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    async getElementText(element, selector) {
        try {
            return await element.locator(selector, { timeout: 50 }).innerText();
        } catch {
            return "";
        }
    }

    async getListOfPages() {
        try {
            const pagesHtml = await this.scenario.getPage().locator(this.selectors.pageListItem).all();
            
            const pages = [];
            for (const pageHtml of pagesHtml) {
                pages.push({
                    title: await this.getElementText(pageHtml, this.selectors.pageTitle),
                    attribute: await this.getElementText(pageHtml, this.selectors.pageAttribute)
                });
            }
            
            return pages;
        } catch (error) {
            throw new Error(`Failed to get list of pages: ${error.message}`);
        }
    }

    async goToNewPage() {
        try {
            await this.scenario.getPage().locator(this.selectors.newPageButton).click();
            await this.waitForLoad();
            await this.scenario.screenshot();
            return new CreatePageScenary(this.scenario);
        } catch (error) {
            throw new Error(`Failed to navigate to new page: ${error.message}`);
        }
    }

    async verifyTitleInList(expectedTitle) {
        const titleElement = await this.scenario.getPage().locator(this.selectors.pageTitle).first();
        const actualTitle = await titleElement.innerText();
        return actualTitle === expectedTitle;
    }

    async findPageByTitle(pageTitle) {
        const pages = await this.getListOfPages();
        return pages.find(page => page.title === pageTitle);
    }
}

module.exports = { ListPages };