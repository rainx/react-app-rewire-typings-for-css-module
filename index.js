const merge = require('deepmerge');

/**
 * Factory to make a typings for css module rewire tool
 *
 * @param {object} options Options to deep merge with the existing options
 * @see https://webpack.js.org/loaders/css-loader/#options
 */
function createRewireTypingsForCssModule(options) {
  return function (config, env) {
    // Disabled in production:
    if (env === 'production') return config;

    // style files regexes copied from ejected webpack.config.js
    const regexes = [
      /\.module\.css$/.toString(),
      /\.module\.(scss|sass)$/.toString()
    ];

    const oneOfs = config.module.rules.find((rule) => !!rule.oneOf).oneOf;
    for (const oneOf of oneOfs) {
      if (!oneOf.test || !regexes.includes(oneOf.test.toString())) continue;
      const cssLoader = oneOf.use.find(
        (entry) =>
          entry.loader &&
          entry.loader.includes('css-loader') &&
          !entry.loader.includes('postcss-loader')
      );
      cssLoader.options = merge(cssLoader.options, options);

      // Insert css-modules-typescript-loader before css-loader
      if (!oneOf.use.includes('css-modules-typescript-loader')) {
        const index = oneOf.use.indexOf(cssLoader);
        oneOf.use.splice(index, 0, 'css-modules-typescript-loader');
      }
    }
    return config;
  };
}

const rewireTypingsForCssModule = createRewireTypingsForCssModule({
  modules: {
    exportLocalsConvention: 'camelCase'
  }
});

rewireTypingsForCssModule.factory = createRewireTypingsForCssModule;

module.exports = rewireTypingsForCssModule;
