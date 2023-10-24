//I can configure rules whith keywords: "off", "error", "warn" for more flexible configuration

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  //Extends includes the recommended rules from the plugin
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // This includes recommended TypeScript rules
    "plugin:prettier/recommended", // This includes recommended eslint-plugin-prettier rules
    "plugin:react-hooks/recommended",
    // "plugin:react/jsx-runtime",  // This disabe requirement for importing "React" in new React version 
  ],
  //Plugins allows ESLint to understand and apply rules from the plugin like Prettier. It doesn't configure specific rules but enables ESLint to recognize and process Prettier-related rules.
  plugins: ["react", "@typescript-eslint", "react-hooks", "prettier", "react-refresh"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
    include: ['<tsconfigRootDir>/src'],
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",

  rules: {
    // Allow constant exports from files (useful for reusing constants)
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    //disable additional unused variables cheking because TS contain this rule
    "no-unused-vars": "off",
    //disable additional type cheking because TS contain this rule
    "react/prop-types": "off",
    //set severity level for prettier to "warn"
    "prettier/prettier": "warn",
  },

  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      pragma: "React",  // Pragma to use, default to "React"
      fragment: "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // It will default to "latest" and warn if missing, and to "detect" in the future
      flowVersion: "0.53" // Flow version
    },
    propWrapperFunctions: [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"},
        // for rules that check exact prop wrappers
        {"property": "forbidExtraProps", "exact": true}
    ],
    componentWrapperFunctions: [
        // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
        "observer", // `property`
        {"property": "styled"}, // `object` is optional
        {"property": "observer", "object": "Mobx"},
        {"property": "observer", "object": "<pragma>"} // sets `object` to whatever value `settings.react.pragma` is set to
    ],
    formComponents: [
      // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
      "CustomForm",
      {"name": "Form", "formAttribute": "endpoint"}
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ],
  }
};
