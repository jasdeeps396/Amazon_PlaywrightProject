import { Page } from "@playwright/test"
import { HomePage } from "./HomePage";
import { SearchResultPage } from "./SearchResultPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";



export class App {
    page: Page
    newPage!:Page
    homePage: HomePage
    searchResultPage: SearchResultPage
    productPage!: ProductPage;
    cartPage!:CartPage;

    constructor(page: Page) {
        this.page = page
        this.homePage = new HomePage(page)
        this.searchResultPage = new SearchResultPage(page)
        
        // this.productPage = new ProductPage(page)
    }

    // Helper to initialize the product page once the tab is available
    initProductPage(newPage: Page) {
        this.productPage = new ProductPage(newPage)
        this.cartPage=new CartPage(newPage)
    }


}