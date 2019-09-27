/**
 * @fileoverview Tests for no-node-module-string rule.
 * @author Will Griffiths
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../sources/rules/no-node-modules-string"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-node-module-string", rule, {
  valid: [
    'var foo = "node";',
    'var foo = "modules";',
    "var foo = /([abc]) \\1/g;",
    "var foo = 'a random string';",
    '// Comment node_modules',
  ],
  invalid: [
    {
      code: 'var foo = "node_modules";',
      errors: [
        {
          message: "Don't use node_modules in strings. Import modules by their names.",
          type: "Literal",
        },
      ],
    },
    {
      code: 'var foo = "node_modules/module-x";',
      errors: [
        {
          message: "Don't use node_modules in strings. Import modules by their names.",
          type: "Literal",
        },
      ],
    },
    {
      code: 'var foo = "../../node_modules";',
      errors: [
        {
          message: "Don't use node_modules in strings. Import modules by their names.",
          type: "Literal",
        },
      ],
    },
    {
      code: 'var foo = "./node_modules/module-x/node_modules";',
      errors: [
        {
          message: "Don't use node_modules in strings. Import modules by their names.",
          type: "Literal",
        },
      ],
    },
    {
      code: 'var foo = require("node_modules/module-x");',
      errors: [
        {
          message: "Don't use node_modules in strings. Import modules by their names.",
          type: "Literal",
        },
      ],
    },
    {
      code:
        'var moduleName = "lodash"; var module = require("../node_modules/" + moduleName);',
      errors: [
        {
          message: "Don't use node_modules in strings. Import modules by their names.",
          type: "Literal",
        },
      ],
    },
  ],
});
