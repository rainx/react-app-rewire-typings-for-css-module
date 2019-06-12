# react-app-rewire-typings-for-css-module

[![Build Status](https://travis-ci.org/rainx/react-app-rewire-typings-for-css-module.svg?branch=master)](https://travis-ci.org/rainx/react-app-rewire-typings-for-css-module)

## Description

Use typings-for-css-module-loader for generate _.d.ts file for css module(Both _.module.css and \*.modules.scss")

Add `css-modules-typescript-loader` after css-loader to generate typedefined file,

> For support css version < 2.x.x, See this older version: https://github.com/rainx/react-app-rewire-typings-for-css-module/tree/aa5239f623a731ed331b6d60a4c3359d2435493e

## Usage

```bash
> yarn add --dev css-modules-typescript-loader react-app-rewire-typings-for-css-module

# or np m

> npm install --save-dev css-modules-typescript-loader react-app-rewire-typings-for-css-module

```

and edit your `config-overrides.js` file

```javascript
const rewireTypingsForCssModule = require("react-app-rewire-typings-for-css-module");

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

If you wanna customized options for `css-loader` you could use the factory to get a new `rewireTypingsForCssModule`

```javascript
// no addition options
config = rewireTypingsForCssModule.factory({})(config);
```
