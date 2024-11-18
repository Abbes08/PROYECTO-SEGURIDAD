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
