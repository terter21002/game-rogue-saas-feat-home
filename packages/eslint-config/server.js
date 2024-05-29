module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  parser: "@typescript-eslint/parser",
};
