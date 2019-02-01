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
            oneOf.use.forEach(entry => {
              if (typeof entry == "object") {
                if (
                  entry.loader &&
                  entry.loader.includes("css-loader") &&
                  !entry.loader.includes("postcss-loader")
                ) {
                  const typingsForCssModuleLoader =
                    "typings-for-css-modules-loader";
                  entry.loader = typingsForCssModuleLoader;
                  entry.options = {
                    ...entry.options,
                    ...options
                  };
                }
              }
              return entry;
            });
          });
      }
    }

    return config;
  };
}

const rewireTypingsForCssModule = createRewireTypingsForCssModule({
  namedExport: true,
  camelCase: true
});

rewireTypingsForCssModule.factory = createRewireTypingsForCssModule;

module.exports = rewireTypingsForCssModule;
