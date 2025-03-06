/// <reference types="cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";
import ProductsPage from "../pages/product.page";
import CartPage from "../pages/cart.page";
import CheckoutInformationPage from "../pages/checkoutinformationpage.page";
import CheckoutOverviewPage from "../pages/CheckoutOvervieuw.page";

// Connexion et préparation
Given('je suis sur la page de connexion', () => {
    cy.visit("https://www.saucedemo.com");
});

When('je me connecte avec l\'utilisateur {string} et le mot de passe {string}', (username, password) => {
    loginPage.login(username, password);
});

When('j\'ajoute le produit {string} au panier', (nomProduit) => {
    ProductsPage.ajouterProduitAuPanier(nomProduit);
});

When('je vais au panier', () => {
    ProductsPage.allerAuPanier();
});

When('je clique sur le bouton checkout', () => {
    CartPage.clickCheckoutButton();
});

When('je saisis mes informations personnelles {string}, {string}, {string}', (prenom, nom, codePostal) => {
    CheckoutInformationPage.completeCheckoutInformation(prenom, nom, codePostal);
});

Then('je suis redirigé vers la page de récapitulatif', () => {
    cy.url().should("include", "/checkout-step-two.html");
});

// Vérification des prix
Then('le prix total et le sous-total sont affichés', () => {
    CheckoutOverviewPage.verifierleprix();
    cy.get(".summary_subtotal_label").should("exist");
    cy.get(".summary_total_label").should("exist");
});

// Finalisation de la commande
When('je finalise la commande', () => {
    CheckoutOverviewPage.cliquersurleButtonfinish();
});

Then('je suis redirigé vers la page de confirmation', () => {
    cy.url().should("include", "/checkout-complete.html");
});

Then('un message de remerciement s\'affiche', () => {
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
});

// Annulation de la commande
When('j\'annule la commande', () => {
    CheckoutOverviewPage.cliquersurleButtoncancel();
});

Then('je suis redirigé vers la page des produits', () => {
    cy.url().should("include", "/inventory.html");
});

Then('le titre de la page est {string}', (titre) => {
    cy.get(".title").should("have.text", titre);
});
