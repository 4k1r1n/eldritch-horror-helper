module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'import'],
  rules: {
    'no-debugger': 'off',
    'no-console': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 1,
  },
};
