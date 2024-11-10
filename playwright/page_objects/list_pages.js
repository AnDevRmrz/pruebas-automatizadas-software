const { CreateEditPreviewFilterDeletePage } = require("./create_edit_preview_filter_delete_page.js");

class ListPages {
    constructor(page) {
        this.page = page;
        this.selectors = {
            newPageButton: "[data-test-new-page-button]",
            pageListItem: "li.gh-posts-list-item-group",
            pageTitle: "h3.gh-content-entry-title",
            pageAttribute: "p.gh-content-entry-status",
        };
    }

    async goto() {
        try {
            await this.page.goto("http://localhost:3002/ghost/#/pages");
            await this.waitForLoad();
        } catch (error) {
            throw new Error(`Failed to navigate to pages: ${error.message}`);
        }
    }

    async waitForLoad(ms = 1000) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    async getElementText(element, selector) {
        try {
            return await element.locator(selector, { timeout: 500 }).innerText();
        } catch {
            return "";
        }
    }

    async getListOfPages() {
        try {
            const pagesHtml = await this.page.locator(this.selectors.pageListItem).all();
            
            return Promise.all(pagesHtml.map(async pageHtml => ({
                title: await this.getElementText(pageHtml, this.selectors.pageTitle),
                attribute: await this.getElementText(pageHtml, this.selectors.pageAttribute)
            })));
        } catch (error) {
            throw new Error(`Failed to get list of pages: ${error.message}`);
        }
    }

    async goToNewPage() {
        try {
            await this.page.locator(this.selectors.newPageButton).click();
            await this.waitForLoad();
            return new CreateEditPreviewFilterDeletePage(this.page);
        } catch (error) {
            throw new Error(`Failed to navigate to new page: ${error.message}`);
        }
    }

    async verifyTitleInList(expectedTitle) {
        const titleElement = await this.page.locator(this.selectors.pageTitle).first();
        const actualTitle = await titleElement.innerText();
        return actualTitle === expectedTitle;
    }

    async findPageByTitle(pageTitle) {
        const pages = await this.getListOfPages();
        return pages.find(page => page.title === pageTitle);
    }
}

module.exports = { ListPages };