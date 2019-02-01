# react-app-rewire-typings-for-css-module

[![Build Status](https://travis-ci.org/rainx/react-app-rewire-typings-for-css-module.svg?branch=master)](https://travis-ci.org/rainx/react-app-rewire-typings-for-css-module)

## Description

Use typings-for-css-module-loader for generate _.d.ts file for css module(Both _.module.css and \*.modules.scss"

this rewire will use `typings-for-css-module-loader` instead of `css-loader` on react app config and along with
`namedExport` and `camelCase` option with it

## Usage

```bash
> yarn add --dev typings-for-css-modules-loader react-app-rewire-typings-for-css-module

# or npm

> npn install --save-dev typings-for-css-modules-loader react-app-rewire-typings-for-css-module

```

and edit your `config-overrides.js` file

```javascript
module.exports = {
  webpack: function(config, env) {
    /**
     * Add this line
     */
    config = rewireTypingsForCssModule(config);
    return config;
  }
};
```
