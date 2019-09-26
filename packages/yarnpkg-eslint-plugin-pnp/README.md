# @yarnpkg/eslint-plugin-pnp

A plugin to help package maintainers support pnp.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add -D eslint
```

Next, install `@yarnpkg/eslint-plugin-pnp` and `eslint-plugin-import`:

```
$ yarn add -D @yarnpgk/eslint-plugin-pnp eslint-plugin-import
```

## Usage

### As a config*

This is the easiest way. It adds the `eslint-plugin-pnp` and `eslint-plugin-import` presets and configures their rules for you.

Add `@yarnpkg/eslint-plugin-pnp/maintainer` to the extends section of your `.eslintrc` configuration file. 

```json
{
  // Use the maintainer config
  extends: ["plugin:@yarnpkg/eslint-plugin-pnp/maintainer"] 
}
```
*Recommended usage

### As a plugin 

Add `@yarnpkg/eslint-plugin-pnp` and `eslint-plugin-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix for the "import" plugin:

```json
{
  plugins: ["@yarnpkg/eslint-plugin-pnp", "import"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "pnp/no-node-modules-strings": 1,
        "pnp/no-unqualified-webpack-config": 1,
        "import/no-extraneous-dependencies": ["error"],
        "import/no-unresolved": ["error", { commonjs: true, caseSensitive: true }]
    }
}
```

## Supported Rules

### PNP rules

- Ensure the packages in third party webpack configs are resolved correctly (pnp/no-unqualified-webpack-config)
- Forbid the use of `node_modules` in strings (pnp/no-node-modules-strings)

## Other rules

- Forbid the use of extraneous packages (import/no-extraneous-dependencies)
- Ensure imports point to a file/module that can be resolved. (import/no-unresolved)
