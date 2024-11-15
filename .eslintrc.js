<<<<<<< HEAD
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
=======
// .eslintrc.js
const globals = require("globals");

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  globals: {
    ...globals.browser,
    ...globals.node
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    // Agrega aquí las reglas específicas que deseas activar
    "no-unused-vars": "error",
    "no-undef": "error",
    "no-useless-escape": "error"
  }
};
>>>>>>> 34322a83f79f8caacbd8ca538a0400c52b8229d0
