const { CreateAndFilterPageScenary } = require("./create_filter_page.js");
const { EditPreviewPageScenary } = require("./edit_preview_page.js");

class ListPages {
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


    async getListOfPages() {
      try {
          // Esperamos a que la lista de páginas esté visible
          await this.scenario.getPage().locator(this.selectors.pageListItem).first().waitFor({ state: 'visible', timeout: 5000 });
          
          const pagesHtml = await this.scenario.getPage().locator(this.selectors.pageListItem).all();
          
          const pages = [];
          for (const pageHtml of pagesHtml) {
              // Esperamos a que el título sea visible
              const titleElement = pageHtml.locator(this.selectors.pageTitle);
              await titleElement.waitFor({ state: 'visible', timeout: 2000 });
              
              const title = await titleElement.innerText();
              const attribute = await this.getElementText(pageHtml, this.selectors.pageAttribute);
              
              console.log(`Página encontrada - Título: "${title}", Atributo: "${attribute}"`);
              
              pages.push({
                  title: title,
                  attribute: attribute
              });
          }
          
          return pages;
      } catch (error) {
          console.error('Error al obtener la lista de páginas:', error);
          throw new Error(`Failed to get list of pages: ${error.message}`);
      }
  }
  
  async getElementText(element, selector) {
      try {
          const locator = element.locator(selector);
          await locator.waitFor({ state: 'visible', timeout: 2000 });
          return await locator.innerText();
      } catch (error) {
          console.log(`No se pudo obtener el texto para el selector: ${selector}`);
          return "";
      }
  }

    async goToNewPage() {
        try {
            await this.scenario.getPage().locator(this.selectors.newPageButton).click();
            await this.waitForLoad();
            await this.scenario.screenshot();
            return new CreateAndFilterPageScenary(this.scenario);
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
          const pageElement = await this.scenario.getPage()
              .locator(`${this.selectors.pageListItem}:has(${this.selectors.pageTitle}:text-is("${pageTitle}"))`);
          
          await pageElement.waitFor({ state: 'visible', timeout: 5000 });
          await pageElement.click();
          await this.waitForLoad();
          await this.scenario.screenshot();
          return new EditPreviewPageScenary(this.scenario);
      } catch (error) {
          throw new Error(`Failed to navigate to edit page: ${error.message}`);
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

    async verifyTitleChanged(expectedTitle) {
      try {
          // Asegurarnos de que estamos en la página de lista
          await this.goto();
          await this.waitForLoad();
          
          // Usar findPageByTitle para buscar la página con el nuevo título
          const foundPage = await this.findPageByTitle(expectedTitle);
          console.log('Página encontrada para verificación:', foundPage);
          
          // Si encontramos la página, significa que el título se cambió correctamente
          return foundPage !== undefined;
      } catch (error) {
          console.error('Error al verificar cambio de título:', error);
          throw new Error(`Failed to verify title change: ${error.message}`);
      }
  }

  async filterByDraft() {
    try {
        const filterTrigger = this.scenario.getPage().locator(this.selectors.filterTrigger);
        await filterTrigger.waitFor({ state: 'visible', timeout: 3000 });
        await filterTrigger.click();
        
        const draftOption = this.scenario.getPage().locator(this.selectors.draftFilterOption);
        await draftOption.waitFor({ state: 'visible', timeout: 3000 });
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
}

module.exports = { ListPages };