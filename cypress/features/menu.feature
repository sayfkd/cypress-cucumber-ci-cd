Feature: Vérification du menu

  Scenario: Quand je clique sur le bouton "Item", rien ne change
    Given je suis sur la page des produits
    When je clique sur le bouton "Item" du menu
    Then aucune redirection ou changement de page ne se produit


  Scenario: Quand je clique sur le bouton "Logout", je suis redirigé vers la page de connexion
    Given je suis sur la page des produits
    When je clique sur le bouton "Logout"
    Then je devrais voir le bouton "Login"
