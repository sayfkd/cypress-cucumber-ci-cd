import { Given } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";
import productPage from "../pages/product.page";

Given('je suis sur la page produits', () => {
  cy.visit("https://www.saucedemo.com/");
  loginPage.login("standard_user", "secret_sauce");
});

Then("la liste des produits doit être affichée", () => {
  productPage.elements.productTitle().should('have.length.greaterThan', 0);
});
  
