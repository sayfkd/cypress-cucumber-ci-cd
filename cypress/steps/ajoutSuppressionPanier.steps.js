/// <reference types="cypress" />

import { Given, When } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";
import productPage from "../pages/product.page";
import cartPage from "../pages/cart.page";

Given('je suis sur la page produits', () => {
  cy.visit("https://www.saucedemo.com/");
  loginPage.login("standard_user", "secret_sauce");
})


When('je clique sur un bouton add to cart pour {string} produits', (s) => {
    let listeProduits = [];
    productPage.elements.productTitle().each((produit, id)=>{
        if(id < s){
            cy.wrap(produit).invoke("text").then((produitTexte) => {
                productPage.ajouterProduitAuPanier(produitTexte.toLowerCase().replace(/\s+/g, "-"));
                listeProduits.push(produitTexte);
            })  
        }         
    });
    Cypress.env("produitsAjoutes", listeProduits);
})

When('je clique sur le bouton panier', () => {
    productPage.allerAuPanier();
})

Then('je retrouve les memes produits dans le panier', () => {
    cy.wrap(cartPage.getAddedProducts()).should('deep.equal', Cypress.env("produitsAjoutes"));
})

When('je clique sur le bouton remove pour {string} produit', (s) => {
    let produitsAjoutes = Cypress.env("produitsAjoutes");
    productPage.elements.productTitle().each((produit, id)=>{
        if(id < s){
            cy.wrap(produit).invoke("text").then((produitTexte) => {
                productPage.retirerProduitDuPanier(produitTexte.toLowerCase().replace(/\s+/g, "-"));
                
                let index = produitsAjoutes.indexOf(produitTexte); 

                if (index !== -1) {
                    produitsAjoutes.splice(index, 1); 
                }
            })  
        }         
    });
    
    Cypress.env("produitsAjoutes", produitsAjoutes);
})




