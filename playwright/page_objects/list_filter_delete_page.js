const { CreatePagePage } = require("./create_page_page.js");
const { EditPreviewPagePage } = require("./edit_preview_page_page.js");

class ListFilterDeletePage {
  constructor(scenario) {
    this.scenario = scenario;
    this.selectors = {
      newPageButton: "[data-test-new-page-button]",
      pageListItem: "li.gh-posts-list-item",
      pageTitle: "h3.gh-content-entry-title",
      pageAttribute: "p.gh-content-entry-status",
      filterTrigger: '.ember-power-select-selected-item:has-text("All pages")',
      draftFilterOption: '[data-option-index="1"]',
      pageListItem: "li.gh-posts-list-item",
      pageTitle: "h3.gh-content-entry-title",
      pageAttribute: "p.gh-content-entry-status",
      deleteButton: '[data-test-button="delete"]',
      confirmDeleteButton: '[data-test-button="confirm"]',
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

  async waitForLoad(ms = 500) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getListOfPages() {
    try {
      const count = await this.scenario
        .getPage()
        .locator(this.selectors.pageListItem)
        .count();

      if (count === 0) {
        return [];
      }

      const pages = [];
      for (let i = 0; i < count; i++) {
        try {
          const pageHtml = await this.scenario
            .getPage()
            .locator(this.selectors.pageListItem)
            .nth(i);
          if (await pageHtml.isVisible()) {
            const titleElement = pageHtml.locator(this.selectors.pageTitle);
            const title = await titleElement.innerText();
            const attribute = await this.getElementText(
              pageHtml,
              this.selectors.pageAttribute
            );

            pages.push({
              title: title,
              attribute: attribute,
            });
          }
        } catch (e) {
          continue;
        }
      }

      return pages;
    } catch (error) {
      console.error("Error al obtener la lista de páginas:", error);
      return [];
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
      return new CreatePagePage(this.scenario);
    } catch (error) {
      throw new Error(`Failed to navigate to new page: ${error.message}`);
    }
  }

  async goToEditPage(pageTitle) {
    try {
      const existingPage = await this.findPageByTitle(pageTitle);
      if (!existingPage) {
        throw new Error(`Page with title "${pageTitle}" not found in the list`);
      }

      const pageElements = await this.scenario
        .getPage()
        .locator(
          `${this.selectors.pageListItem}:has(${this.selectors.pageTitle}:text-is("${pageTitle}"))`
        )
        .all();

      if (pageElements.length === 0) {
        throw new Error(`No page elements found with title "${pageTitle}"`);
      }

      // Tomamos el primer elemento que coincida
      await pageElements[0].waitFor({ state: "visible", timeout: 5000 });
      await pageElements[0].click();

      await this.waitForLoad();
      await this.scenario.screenshot();
      return new EditPreviewPagePage(this.scenario);
    } catch (error) {
      throw new Error(`Failed to navigate to edit page: ${error.message}`);
    }
  }

  async verifyTitleInList(expectedTitle) {
    try {
      const pages = await this.getListOfPages();
      return pages.some((page) => page.title === expectedTitle);
    } catch (error) {
      throw new Error(`Failed to verify title in list: ${error.message}`);
    }
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

  async filterByDraft() {
    try {
      const filterTrigger = this.scenario
        .getPage()
        .locator(this.selectors.filterTrigger);
      await filterTrigger.waitFor({ state: "visible", timeout: 3000 });
      await filterTrigger.click();

      const draftOption = this.scenario
        .getPage()
        .locator(this.selectors.draftFilterOption);
      await draftOption.waitFor({ state: "visible", timeout: 3000 });
      await draftOption.click();

      await this.waitForLoad();
      await this.scenario.screenshot();
    } catch (error) {
      throw new Error(`Failed to filter draft pages: ${error.message}`);
    }
  }

  async getPageAttributeByTitle(pageTitle) {
    try {
      const page = await this.findPageByTitle(pageTitle);
      return page ? page.attribute : null;
    } catch (error) {
      throw new Error(`Failed to get page attribute: ${error.message}`);
    }
  }

  async verifyPageDeleted(deletedPageTitle) {
    try {
      // Esperamos a que la lista de páginas se actualice
      await this.waitForLoad();

      // Buscamos la página en la lista actualizada
      const page = await this.findPageByTitle(deletedPageTitle);

      // La página no debería existir
      return page === undefined;
    } catch (error) {
      throw new Error(`Failed to verify page deletion: ${error.message}`);
    }
  }

  async rightClickOnPage(pageTitle) {
    try {
      const titleElement = this.scenario
        .getPage()
        .locator(`${this.selectors.pageTitle}:text-is("${pageTitle}")`)
        .first();

      const elementHandle = await titleElement.elementHandle();
      await this.scenario.getPage().evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, elementHandle);

      await titleElement.click({ button: "right" });
      await this.waitForLoad();
      await this.scenario.screenshot();
    } catch (error) {
      throw new Error(`Failed to right click on page: ${error.message}`);
    }
  }

  async clickDeleteButton() {
    try {
      const deleteButton = this.scenario
        .getPage()
        .locator(this.selectors.deleteButton);
      await this.waitForLoad();
      await deleteButton.click({ force: true });

      await this.waitForLoad();
      await this.scenario.screenshot();
    } catch (error) {
      throw new Error(`Failed to click delete button: ${error.message}`);
    }
  }

  async confirmDelete() {
    try {
      const confirmButton = this.scenario
        .getPage()
        .locator(this.selectors.confirmDeleteButton);
      await confirmButton.waitFor({ state: "visible", timeout: 5000 });
      await confirmButton.click();
      await this.waitForLoad();
      await this.scenario.screenshot();
    } catch (error) {
      throw new Error(`Failed to confirm deletion: ${error.message}`);
    }
  }
  async deleteAllPages() {
    try {
      await this.goto(); // Aseguramos que estamos en la página de listado
      await this.waitForLoad();

      while (true) {
        // Obtener todas las páginas actuales
        const pages = await this.getListOfPages();

        // Si no hay más páginas, salimos del bucle
        if (pages.length === 0) {
          break;
        }

        // Tomar el título de la primera página
        const firstPageTitle = pages[0].title;

        // Usar las funciones existentes para eliminar
        await this.rightClickOnPage(firstPageTitle);
        await this.clickDeleteButton();
        await this.confirmDelete();

        // Esperar un momento para que la lista se actualice
        await this.waitForLoad();
      }
    } catch (error) {
      throw new Error(`Failed to delete all pages: ${error.message}`);
    }
  }
}

module.exports = { ListFilterDeletePage };
