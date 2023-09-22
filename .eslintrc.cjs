module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // Add this line to enable eslint-plugin-prettier
    /**Github plagin with quality code settings */
    "plugin:github/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "github"],
  rules: {
    // Allow constant exports from files (useful for reusing constants)
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // if github naming 
    // "filenames/match-regex": ["error", "^[A-Z][a-zA-Z]*$"],
  },
};
