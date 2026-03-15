import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
    page: Page
    productTitle: Locator
    productQuantity: Locator
    addToCartButton: Locator
    productAddedToCartMessage: Locator
    cartSubtotalMsg: Locator
    gotoCartButton: Locator
    priceLocator: Locator

    constructor(page: Page) {

        this.page = page;
        this.productTitle = this.page.locator("#productTitle")
        this.productQuantity = this.page.locator("#quantity")
        this.addToCartButton = this.page.locator("#add-to-cart-button")
        this.productAddedToCartMessage = this.page.getByText("Added to cart")
        this.cartSubtotalMsg = this.page.getByText("Cart subtotal:")
        this.gotoCartButton = page.locator("#sw-gtc")
        this.priceLocator = page.locator("#corePriceDisplay_desktop_feature_div  .a-price-whole")

    }

    async verifyProductOpened(productName: string) {
        await this.productTitle.first().waitFor()

        await expect(this.productTitle.first()).toContainText(productName, { ignoreCase: true })
        await expect(this.priceLocator).toBeVisible()
        const productPrice = await this.priceLocator.textContent()
        return productPrice;

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



    }
    async verifyCartSubtotal(productPrice:string) {
        
        const price = Number(productPrice.replace(/,/g, ''))
        const doubledPrice = price * 2;
        

        const formattedPrice = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(doubledPrice);
       
        await expect(this.cartSubtotalMsg).toBeVisible()
        await expect(this.page.getByText(formattedPrice).first()).toBeVisible()
    }


    async clickOnGotoCartButton() {
        await expect(this.gotoCartButton).toBeVisible()
        await this.gotoCartButton.click()
    }

}
