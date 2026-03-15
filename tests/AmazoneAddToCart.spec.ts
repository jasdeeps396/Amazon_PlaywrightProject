import { test, expect } from "@playwright/test"
import { App } from "../pages/App"
import productData from '../test-data/productData.json';


const SEARCH_PRODUCT = productData.SEARCH_PRODUCT
const product_Quantity =productData.product_Quantity
const PRODUCT_NAME=productData.SEARCH_PRODUCT

test("User can search HP Smart Tank printer and add Smart Tank 589 to cart", async ({ page }) => {
  const app = new App(page)

  await app.homePage.goto()
  await app.homePage.verifyThatHomePageLoadedSuccessfully()

  //search product
  await app.homePage.searchProduct(SEARCH_PRODUCT)

  //verify search results
  await app.searchResultPage.verifySearchedResultsAppeared()
  const newTap=await app.searchResultPage.selectProduct(PRODUCT_NAME);
  
  //Initialize the productPage with the newTab
  app.initProductPage(newTap)

  // verify product opened
  await app.productPage.verifyProductOpened(PRODUCT_NAME)

  // select product quantity
  await app.productPage.selectProductQuantity(product_Quantity)

  // add product to cart
  await app.productPage.addProductToCart()

  // verify product added to cart
  await app.productPage.verifyProductAddedToCartDetails()

  // click on gotoCart button

  await app.productPage.clickOnGotoCartButton()

  // verify product details on cart page
  await app.cartPage.verifyProductAddedToCartDetails(product_Quantity)

  





})