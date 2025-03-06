import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../pages/login.page";
import productPage from "../pages/product.page";

// Connexion et préparation
Given('je suis sur la page des produits', () => {
  cy.visit("https://www.saucedemo.com");
});

When('je me connecte avec l\'utilisateur {string} et le mot de passe {string}', (username, password) => {
  loginPage.login(username, password);
});

Then('je suis redirigé vers la page des produits', () => {
  cy.url().should("include", "/inventory.html");
});

// Scénarios de tri
When('je trie les produits par ordre alphabétique A-Z', () => {
  let produitsNonTries = [];

  // Récupérer les produits avant de faire le tri
  productPage.elements.productTitle()
    .then((elements) => {
      produitsNonTries = Array.from(elements).map((el) => el.innerText.trim().toLowerCase()); // Normalisation pour comparaison
    })
    .then(() => {
      // Appliquer le tri "A-Z"
      productPage.selectionnerTriPar("az");

      // Vérifier que le tri est bien appliqué
      productPage.verifierTriSelectionne("az");

      // Récupérer les produits après le tri
      cy.get('.inventory_item_name')
        .then((elements) => {
          const produitsApresTri = Array.from(elements).map((el) => el.innerText.trim().toLowerCase()); // Normalisation pour comparaison

          // Vérifier que les produits sont triés A-Z
          const produitsManuellementTries = produitsNonTries.sort();

          expect(produitsApresTri).to.deep.equal(produitsManuellementTries);
        });
    });
});

When('je trie les produits par ordre alphabétique Z-A', () => {
  let produitsNonTries = [];

  // Récupérer les produits avant de faire le tri
  productPage.elements.productTitle()
    .then((elements) => {
      produitsNonTries = Array.from(elements).map((el) => el.innerText.trim().toLowerCase()); // Normalisation pour comparaison
    })
    .then(() => {
      // Appliquer le tri "Z-A"
      productPage.selectionnerTriPar("za");

      // Vérifier que le tri est bien appliqué
      productPage.verifierTriSelectionne("za");

      // Récupérer les produits après le tri
      cy.get('.inventory_item_name')
        .then((elements) => {
          const produitsApresTri = Array.from(elements).map((el) => el.innerText.trim().toLowerCase()); // Normalisation pour comparaison

          // Vérifier que les produits sont triés Z-A
          const produitsManuellementTries = produitsNonTries.sort().reverse();

          expect(produitsApresTri).to.deep.equal(produitsManuellementTries);
        });
    });
});

// Implémentation pour vérifier le tri A-Z
Then('les produits sont triés correctement par ordre alphabétique A-Z', () => {
  // Vérification manuelle du tri A-Z
  cy.get('.inventory_item_name').each(($el, index, $list) => {
    if (index > 0) {
      const previousProduct = $list[index - 1].innerText.trim().toLowerCase();
      const currentProduct = $el.text().trim().toLowerCase();
      expect(previousProduct <= currentProduct).to.be.true;
    }
  });
});

// Implémentation pour vérifier le tri Z-A
Then('les produits sont triés correctement par ordre alphabétique Z-A', () => {
  // Vérification manuelle du tri Z-A
  cy.get('.inventory_item_name').each(($el, index, $list) => {
    if (index > 0) {
      const previousProduct = $list[index - 1].innerText.trim().toLowerCase();
      const currentProduct = $el.text().trim().toLowerCase();
      expect(previousProduct >= currentProduct).to.be.true; // On s'assure que l'ordre est décroissant (Z-A)
    }
  });
});

