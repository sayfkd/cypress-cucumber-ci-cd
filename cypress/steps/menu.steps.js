import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";
import MenuPage from "../pages/menu.page";


Given('je suis sur la page des produits', () => {
  cy.visit("https://www.saucedemo.com");
  loginPage.login("standard_user", "secret_sauce");
  cy.url().should("include", "/inventory.html");
});


When('je clique sur le bouton "Item" du menu', () => {
  MenuPage.sasirSurMenuButton();
  MenuPage.saisirAllItem();
});


Then('aucune redirection ou changement de page ne se produit', () => {
  cy.url().should("include", "/inventory.html");
});





When('je clique sur le bouton "Logout"', () => {
  MenuPage.sasirSurMenuButton();
  MenuPage.saisirLogOut();
});

Then('je devrais voir le bouton "Login"', () => {
  cy.get("#login-button").should("be.visible"); 
});


Then('mon panier doit être vide', () => {
  cy.get(".shopping_cart_badge").should('not.exist');  });
