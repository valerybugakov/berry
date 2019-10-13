/**
 * @fileoverview a plugin to help package maintainers support pnp
 * @author Will
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  configs: {
    maintainer: {
      extends: [
        require.resolve('./configs/imports'),
        require.resolve('./configs/pnp'),
        require.resolve('./configs/json'),
      ],
    },
  },
  // import all rules in lib/rules
  rules: {
    'no-node-modules-string': require('./rules/no-node-modules-string'),
    'no-unqualified-webpack-config': require('./rules/no-unqualified-webpack-config'),
  },
};
