Feature: Processus de checkout sur SauceDemo

  Scenario: Finaliser une commande avec succès
    Given je suis sur la page produits
    When je clique sur un produit "Sauce Labs Backpack"
    And j'ajoute le produit au panier
    And je vais au panier
    And je clique sur le bouton checkout
    And je saisis mes informations personnelles "test", "test", "75"
    And je finalise la commande
    Then un message de confirmation s'affiche
