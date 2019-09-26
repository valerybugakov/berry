// Source: https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
module.exports = {
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".mjs", ".js", ".json"]
      }
    },
    "import/extensions": [".js", ".mjs", ".jsx"],
    "import/core-modules": [],
    "import/ignore": ["node_modules", "\\.(coffee|scss|css|less|hbs|svg|json)$"]
  },

  rules: {
    // Static analysis:

    // ensure imports point to files/modules that can be resolved
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    "import/no-unresolved": ["error", { commonjs: true, caseSensitive: true }],

    // Helpful warnings:

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "test/**", // tape, common npm pattern
          "tests/**", // also common npm pattern
          "spec/**", // mocha, rspec-like pattern
          "**/__tests__/**", // jest pattern
          "**/__mocks__/**", // jest pattern
          "test.{js,jsx}", // repos with a single test file
          "test-*.{js,jsx}", // repos with multiple top-level test files
          "**/*{.,_}{test,spec}.{js,jsx}", // tests where the extension or filename suffix denotes that it is a test
          "**/jest.config.js", // jest config
          "**/jest.setup.js", // jest setup
          "**/vue.config.js", // vue-cli config
          "**/webpack.config.js", // webpack config
          "**/webpack.config.*.js", // webpack config
          "**/rollup.config.js", // rollup config
          "**/rollup.config.*.js", // rollup config
          "**/gulpfile.js", // gulp config
          "**/gulpfile.*.js", // gulp config
          "**/Gruntfile{,.js}", // grunt config
          "**/protractor.conf.js", // protractor config
          "**/protractor.conf.*.js" // protractor config
        ],
        optionalDependencies: false,
        peerDependencies: false
      }
    ]
  }
};
