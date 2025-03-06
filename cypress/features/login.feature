Feature: Authentification utilisateur sur SauceDemo

    @positif
  Scenario: Connexion avec un utilisateur valide et un mot de passe valide
    Given l utilisateur est sur la page de connexion "https://www.saucedemo.com/"
    When il saisit le nom d utilisateur "standard_user"
    And il saisit le mot de passe "secret_sauce"
    And il clique sur le bouton de connexion
    Then le menu du site doit être visible

    @negatif
  Scenario: Connexion avec un utilisateur valide et un mot de passe invalide
    Given l utilisateur est sur la page de connexion "https://www.saucedemo.com/"
    When il saisit le nom d utilisateur "standard_user"
    And il saisit le mot de passe "secret_sauce1"
    And il clique sur le bouton de connexion
    Then un message d erreur doit etre affiche

   @negatif
  Scenario: Connexion avec un utilisateur invalide et un mot de passe valide
    Given l utilisateur est sur la page de connexion "https://www.saucedemo.com/"
    When il saisit le nom d utilisateur "standard_user1"
    And il saisit le mot de passe "secret_sauce"
    And il clique sur le bouton de connexion
    Then un message d erreur doit etre affiche

