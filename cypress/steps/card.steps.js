import { Given, When } from "cypress-cucumber-preprocessor/steps";
import productPage from "../pages/product.page";
import cardPage from "../pages/cart.page";

Then('je suis redirige vers la page du panier', () => {
    cardPage.elements.titre().should('have.text', 'Your Cart');
})
When('je clique sur le panier', () => {
    productPage.allerAuPanier();
})

Then('le badge du panier affiche {string}', (s) => {
    productPage.elements.cartNumbre().should("have.text", s);
})

When('je clique sur le bouton Add to card du produit {string}', (s) => {
    productPage.ajouterProduitAuPanier(s);
})

Then('les produits sont visible dans le panier', () => {
    cardPage.elements.addedProducts_list().should('be.visible');
    cardPage.elements.addedProducts_list().should('have.length', 2);
})

When('je clique sur le Panier', () => {
    productPage.allerAuPanier();
})


When('je clique sur le bouton Remove des produits', (productName) => {
    cardPage.elements.addedProducts_list().each((product) => {
            cy.get('button').contains('Remove').click();
    });
  });

Then('le produit est supprime du panier', () => {
  cardPage.elements.addedProducts_list().should('have.length', 0);
})


