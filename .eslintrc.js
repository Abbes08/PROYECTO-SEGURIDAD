// eslint.config.js
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha // Añadido para reconocer `describe` e `it` en archivos de prueba
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-useless-escape": "error"
    }
  }
];
