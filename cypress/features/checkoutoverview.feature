Feature: Test de la page de paiement sur SauceDemo
 Background: Connexion et ajout au panier
    Given je suis sur la page de connexion
    When je me connecte avec l'utilisateur "standard_user" et le mot de passe "secret_sauce"
    And j'ajoute le produit "sauce-labs-backpack" au panier
    And je vais au panier
    And je clique sur le bouton checkout
    And je saisis mes informations personnelles "test", "test", "75"
    Then je suis redirigé vers la page de récapitulatif

  Scenario: Vérifier que le prix total est visible
    Then le prix total et le sous-total sont affichés

  Scenario: Finaliser l'achat
    When je finalise la commande
    Then je suis redirigé vers la page de confirmation
    And un message de remerciement s'affiche

  Scenario: Annuler l'achat
    When j'annule la commande
    Then je suis redirigé vers la page des produits
    And le titre de la page est "Products"