/**
 * @fileoverview Tests for no-unqualified-webpack-config rule.
 * @author Will Griffiths
 */

"use strict";


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../sources/rules/no-unqualified-webpack-config"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-unqualified-webpack-config", rule, {
  valid: [
    {
      filename: "foo/webpack.config.js",
      code:"module.exports = { \
        plugins: [ \
          require.resolve('babel-loader') \
        ] \
      }"
    },
    {
      filename: "foo/webpack.config.js",
      code:"var MiniCssExtractPlugin = require('mini-css-extract-plugin'); \
        module.exports = { \
          loader: MiniCssExtractPlugin.loader \
      }"
    },
    {
      filename: "foo/webpack.config.js",
      code:"module.exports = { \
      module: { \
        rules: [ \
          { \
            test: /\.css$/, \
            use: [ \
              require.resolve(process.env.NODE_ENV === 'production' ? 'style-loader' : 'extract-loader') \
            ], \
          }] \
      } \
    }"
  },
    {
      filename: "foo/bar.js",
      code: "module.exports = { \
        loader: 'babel-loader' \
        }"
    }
  ],
  invalid: [
    {
      filename: "foo/webpack.config.js",
      code: "module.exports = { \
        loader: 'babel-loader'  }  ",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
      ],
    },
    {
      filename: "foo/webpack.config.js",
      code: "module.exports = { \
        module: { \
          rules: [ \
            { \
              test: /\.js$/, \
              use: ['babel-loader'] \
            }] \
        } \
      }",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
      ],
    },
    {
      filename: "foo/webpack.config.js",
      code: "var babelLoader = 'babel-loader'; \
      module.exports = { \
        module: { \
          rules: [ \
            { \
              test: /\.js$/, \
              use: [babelLoader] \
            }] \
        }\
      }",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
      ],
    },
    {
      filename: "foo/webpack.config.js",
      code: "module.exports = { \
        module: { \
          rules: [ \
            { \
              test: /\.js$/, \
              use: [{loader: 'css-loader', options: {}}] \
            }] \
        } \
      }",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
      ],
    },
    {
      filename: "foo/webpack.config.js",
      code: "module.exports = { \
        module: { \
          rules: [ \
            { \
              test: /\.css$/, \
              use: [ \
                process.env.NODE_ENV === 'production' ? 'style-loader' : 'extract-loader', \
                require.resolve('css-loader') \
              ], \
            }] \
        } \
      }",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        }
      ],
    },
    {
      filename: "foo/webpack.config.js",
      code: "module.exports = { \
        module: { \
          rules: [ \
            { \
              test: /\.js$/, \
              use: [ \
                env.threads !== 0 && 'thread-loader', \
                require.resolve('babel-loader') \
              ].filter(Boolean), \
            }] \
        } \
      }",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
      ],
    },
    {
      filename: "foo/webpack.config.js",
      code: "module.exports = { \
        presets: ['es2015'] \
      }",
      errors: [
        {
          message: "Do not use string literals for resolving modules in your webpack config",
          type: "Literal",
        },
      ],
    },
  ],
});

