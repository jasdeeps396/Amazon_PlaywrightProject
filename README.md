# Amazon Automation Assignment

This project automates the provided assignment scenario using
**Playwright with TypeScript.

The framework follows a Page Object Model (POM) approach to keep
tests readable, maintainable, and easy to extend.

## Test Flow

Go to Amazon.in
Search for “HP smart tank”
Verify if the search produces results
Select the printer with name “Smart Tank 589”
Verify if Product page opens
Select Quantity as 2
Click “Add to cart”
Verify if Cart Subtotal appears and verify the price
Click “Go to Cart”
Verify if Shopping Cart opens
Verify the items in the cart including the item name and the quantity

## Run Tests

npm install npx playwright install npx playwright test

## Setup

npm install

Run tests

npx playwright test

Framework Features

Page Object Model
Reusable test data
Environment independent design
CI/CD ready
Automatic screenshots on failure


Author: Jasdeep