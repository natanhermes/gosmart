module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  extends: [
    'airbnb-base',
    'jquery',
    'prettier'
  ],
  plugins: ['prettier','html'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this" : "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    //"no-unused-vars": ["error", { "argsIgnorePattern": true}],
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "eqeqeq": [2, "always", {"null": "ignore"}],
    "no-plusplus": "off"
  },
};
