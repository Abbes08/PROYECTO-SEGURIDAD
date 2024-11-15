// .eslintrc.js
const globals = require("globals");
const pluginJs = require("@eslint/js");

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
    "eslint:recommended",
    pluginJs.configs.recommended // Configuración recomendada del plugin JS
  ],
  rules: {
    // Agrega aquí las reglas específicas que deseas activar
    "no-unused-vars": "error",
    "no-undef": "error",
    "no-useless-escape": "error"
  }
};
