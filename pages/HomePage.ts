import { Page, expect, Locator } from "@playwright/test";

export class HomePage {

    page: Page
    searchBox: Locator
    carouselCard: Locator
    searchButton:Locator

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder("Search Amazon.in")
        this.carouselCard = page.locator(".a-carousel-card")
        this.searchButton =page.locator('input[type="submit"]')
    }

    async goto(): Promise<void> {
        await this.page.goto("/")
    }

    async verifyThatHomePageLoadedSuccessfully(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.carouselCard.last()).toBeVisible()
    }

    async searchProduct(searchProduct: string): Promise<void> {
        await this.searchBox.fill(searchProduct)
        await this.page.keyboard.press("Enter")
    }


}