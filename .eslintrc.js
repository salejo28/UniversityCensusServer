module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: true }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    curly: "error",
    "no-empty": "error",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    eqeqeq: "error",
  },
};
