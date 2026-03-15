import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
    page: Page
    productTitle: Locator
    productQuantity: Locator
    addToCartButton: Locator
    productAddedToCartMessage: Locator
    cartSubtotalMsg: Locator
    gotoCartButton: Locator

    constructor(page: Page) {

        this.page = page;
        this.productTitle = this.page.locator("#productTitle")
        this.productQuantity = this.page.locator("#quantity")
        this.addToCartButton = this.page.locator("#add-to-cart-button")
        this.productAddedToCartMessage = this.page.getByText("Added to cart")
        this.cartSubtotalMsg = this.page.getByText("Cart subtotal:")
        this.gotoCartButton = page.locator("#sw-gtc")

    }

    async verifyProductOpened(productName: string): Promise<void> {
        await this.productTitle.first().waitFor()

        await expect(this.productTitle.first()).toContainText(productName, { ignoreCase: true })
    }

    async selectProductQuantity(quantity: string) {
        await this.page.waitForLoadState("domcontentloaded")

        await this.productQuantity.waitFor()
        await this.productQuantity.selectOption(quantity)
    }
    async addProductToCart() {
        await this.addToCartButton.waitFor()
        await this.addToCartButton.click()
    }

    async verifyProductAddedToCartDetails() {
        await this.productAddedToCartMessage.first().waitFor()
        await expect(this.productAddedToCartMessage.first()).toBeVisible()
        await expect(this.cartSubtotalMsg).toBeVisible()
    }

    async clickOnGotoCartButton() {
        await expect(this.gotoCartButton).toBeVisible()
        await this.gotoCartButton.click()
    }

}
