import { expect, Locator, Page } from "@playwright/test";

export class SearchResultPage
{

    page:Page
    resultsItems:Locator
    constructor(page:Page )
    {
      this.page=page;
      this.resultsItems = this.page.locator("[data-component-type='s-search-result']")
    }


    async verifySearchedResultsAppeared() : Promise <void>
    {
     await expect(this.resultsItems.last()).toBeVisible()
    }

    async selectProduct(productName:string)
    {
        const target = this.resultsItems.filter({ hasText: productName })
        const [newPage] = await Promise.all(
        [
           this.page.context().waitForEvent('page'),
            await target.locator("a h2").first().click()

        ]

        
    )

    return newPage
    }





}