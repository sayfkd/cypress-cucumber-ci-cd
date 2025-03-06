import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";
import productPage from "../pages/product.page";
import cartPage from "../pages/cart.page";
import checkoutInformationPage from "../pages/checkoutinformationpage.page";
import checkoutOverviewPage from "../pages/CheckoutOvervieuw.page";
import checkoutCompletePage from "../pages/checkout.complete.page";


Given('je suis sur la page produits', () => {
  cy.visit('https://www.saucedemo.com/');
  loginPage.login("standard_user", "secret_sauce");
});


When('je clique sur un produit {string}', (product) => {
  productPage.cliquerSurProduit(product); 
});

When('j\'ajoute le produit au panier', () => {  
  cy.get('[data-test="add-to-cart"]').first().click(); 
});
When('je vais au panier', () => {
  productPage.allerAuPanier(); 
});
When('je clique sur le bouton checkout', () => {
  cy.get('#checkout').first().click(); 
});
When('je saisis mes informations personnelles {string}, {string}, {string}', (prenom, nom, codePostal) => {
  checkoutInformationPage.completeCheckoutInformation(prenom, nom, codePostal);
});
When('je finalise la commande', () => {
  checkoutOverviewPage.cliquersurleButtonfinish();
});
Then('un message de confirmation s\'affiche', () => {
  cy.get('.pony_express').should('be.visible');
});





