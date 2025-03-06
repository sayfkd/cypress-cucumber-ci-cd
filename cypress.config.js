const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default; 

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    pageLoadTimeout: 120000,
    specPattern: "cypress/features/**/*.feature", // a ajouter
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber()); // ajouter
    },
  },
});