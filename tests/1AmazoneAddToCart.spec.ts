import { test, expect } from "@playwright/test"


const SEARCH_PRODUCT = "HP smart tank"
test("User can search HP Smart Tank printer and add Smart Tank 589 to cart", async ({ page }) => {
    const searchBox = page.getByPlaceholder("Search Amazon.in")

    await page.goto("http://amazon.in")
    await page.locator(".a-carousel-card").last().waitFor()
   
    await page.locator('input[type="submit"]').click()
    await page.waitForLoadState("domcontentloaded")

    const results = page.locator("[data-component-type='s-search-result']")
    await results.last().waitFor()
    const target = results.filter({ hasText: "Smart Tank 580" })



    const [newPage] = await Promise.all(
        [
            page.context().waitForEvent('page'),
            await target.locator("a h2").first().click()

        ]
    )
    const productTitle = newPage.locator("#productTitle")
    await productTitle.first().waitFor()

    await expect(productTitle.first()).toContainText("Smart Tank 580", { ignoreCase: true })
    await newPage.waitForLoadState("domcontentloaded")
    const quantity = newPage.locator("#quantity")
    await quantity.waitFor()
    await quantity.selectOption("2")
    
    await newPage.locator("#add-to-cart-button").click()
   
    await newPage.getByText("Added to cart").first().waitFor()
    await expect(newPage.getByText("Added to cart").first()).toBeVisible()

    await expect(newPage.getByText("Cart subtotal:")).toBeVisible()
    await newPage.getByText("Go to Cart").click()
    // await newPage.getByRole("link",{name:"Go to Cart"})
    await newPage.locator("#sc-active-items-header").waitFor()
    await expect(newPage.locator("#sc-active-items-header")).toContainText("Shopping Cart")
    
    await expect(newPage.getByText("Quantity is 2")).toBeVisible()


})