/// <reference types="cypress" />

import { Given, When } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";


Given('l utilisateur est sur la page de connexion {string}', (s) => {
    cy.visit(s);
    cy.url().should("include", "saucedemo")
})

When('il saisit le nom d utilisateur {string}', (s) => {
 loginPage.saisirUsername(s);
})

When('il saisit le mot de passe {string}', (s) => {
  loginPage.saisirPassword(s);
})

When('il clique sur le bouton de connexion', () => {
  loginPage.cliqueSurLoginButton();
})

Then('le menu du site doit être visible', () => {
    cy.get("#react-burger-menu-btn").should("be.visible");
})

Then('un message d erreur doit etre affiche', () => {
 loginPage.elements.errorMessage().should("be.visible");
})


