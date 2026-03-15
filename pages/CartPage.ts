import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    page: Page
    shoppingCartMessage: Locator
    constructor(page: Page) {
        this.page = page
        this.shoppingCartMessage = page.locator("#sc-active-items-header")
    }

    async verifyProductAddedToCartDetails(quantity: string) {
        await expect(this.shoppingCartMessage).toContainText("Shopping Cart")
        await expect(this.page.getByText(`Quantity is ${quantity}`)).toBeVisible()
    }




}