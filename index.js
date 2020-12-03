/**
 * Factory to make a typings for css module rewire tool
 *
 * @param {object} options This option is the string append after loader eg: '{namedExport: true, camelCase: true }
 */
function createRewireTypingsForCssModule(options) {
  return function(config, env) {
    // style files regexes
    // This is copy from ejected webpack.config.js
    const cssModuleRegex = /\.module\.css$/;
    const sassModuleRegex = /\.module\.(scss|sass)$/;

    const devMode = env !== "production";
    // Only work on dev mode
    if (devMode) {
      const oneOfRule = config.module.rules.find(
        rule => rule.oneOf !== undefined
      );

      if (oneOfRule) {
        oneOfRule.oneOf
          .filter(oneOf => {
            return (
              oneOf.test &&
              (oneOf.test.toString() === cssModuleRegex.toString() ||
                oneOf.test.toString() === sassModuleRegex.toString())
            );
          })
          .forEach(oneOf => {
            // To insert css-modules-typescript-loader before css-loader
            let cssLoaderIndex = -1;
            oneOf.use.forEach((entry, index) => {
              if (typeof entry == "object") {
                if (
                  entry.loader &&
                  entry.loader.includes("css-loader") &&
                  !entry.loader.includes("postcss-loader")
                ) {
                  cssLoaderIndex = index;
                }
              }
              return entry;
            });
            // Add the loader
            if (cssLoaderIndex !== -1) {
              // Append options
              if (oneOf.use[cssLoaderIndex].options) {
                oneOf.use[cssLoaderIndex].options = {
                  ...oneOf.use[cssLoaderIndex].options,
                  ...options
                };
              }

              oneOf.use.splice(
                cssLoaderIndex,
                0,
                "css-modules-typescript-loader"
              );
              console.log(JSON.stringify(oneOf, 2));
            }
          });
      }
    }

    return config;
  };
}

const rewireTypingsForCssModule = createRewireTypingsForCssModule({
  modules: {
    exportLocalsConvention: "camelCase"
  }
});

rewireTypingsForCssModule.factory = createRewireTypingsForCssModule;

module.exports = rewireTypingsForCssModule;
