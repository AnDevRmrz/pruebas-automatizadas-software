const { CreateDeletePagePage } = require("./create_delete_page_page.js");

class ListPage {
  constructor(scenario) {
    this.scenario = scenario;
    this.selectors = {
      newPageButton: 'a[href="#/editor/page/"]',
      pageListItem: "li.gh-posts-list-item",
      pageTitle: "h3.gh-content-entry-title",
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
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getListOfPages() {
    try {
      // Esperamos a que la lista de páginas esté visible
      await this.scenario
        .getPage()
        .locator(this.selectors.pageListItem)
        .first()
        .waitFor({ state: "visible", timeout: 5000 });

      const pagesHtml = await this.scenario
        .getPage()
        .locator(this.selectors.pageListItem)
        .all();

      const pages = [];
      for (const pageHtml of pagesHtml) {
        // Esperamos a que el título sea visible
        const titleElement = pageHtml.locator(this.selectors.pageTitle);
        await titleElement.waitFor({ state: "visible", timeout: 2000 });

        const title = await titleElement.innerText();

        pages.push({
          title: title,
        });
      }

      return pages;
    } catch (error) {
      console.error("Error al obtener la lista de páginas:", error);
      throw new Error(`Failed to get list of pages: ${error.message}`);
    }
  }

  async getElementText(element, selector) {
    try {
      const locator = element.locator(selector);
      await locator.waitFor({ state: "visible", timeout: 2000 });
      return await locator.innerText();
    } catch (error) {
      console.log(`No se pudo obtener el texto para el selector: ${selector}`);
      return "";
    }
  }

  async goToNewPage() {
    try {
      await this.scenario
        .getPage()
        .locator(this.selectors.newPageButton)
        .click();
      await this.waitForLoad();
      await this.scenario.screenshot();
      return new CreateDeletePagePage(this.scenario);
    } catch (error) {
      throw new Error(`Failed to navigate to new page: ${error.message}`);
    }
  }

  async verifyTitleInList(expectedTitle) {
    const titleElement = await this.scenario
      .getPage()
      .locator(this.selectors.pageTitle)
      .first();
    const actualTitle = await titleElement.innerText();
    return actualTitle === expectedTitle;
  }

  async findPageByTitle(pageTitle) {
    const pages = await this.getListOfPages();

    return pages.find((page) => page.title === pageTitle);
  }

  async verifyTitleChanged(expectedTitle) {
    try {
      // Asegurarnos de que estamos en la página de lista
      await this.goto();
      await this.waitForLoad();

      // Usar findPageByTitle para buscar la página con el nuevo título
      const foundPage = await this.findPageByTitle(expectedTitle);

      // Si encontramos la página, significa que el título se cambió correctamente
      return foundPage !== undefined;
    } catch (error) {
      console.error("Error al verificar cambio de título:", error);
      throw new Error(`Failed to verify title change: ${error.message}`);
    }
  }
}

module.exports = { ListFilterDeletePage: ListPage };
