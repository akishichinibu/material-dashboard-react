const {
  override, 
  addDecoratorsLegacy, 
  addBundleVisualizer, 
  addWebpackAlias, 
  addWebpackResolve,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // disable eslint in webpack
  // disableEsLint(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE === "1" && addBundleVisualizer(),

  addWebpackAlias({
    ["components$"]: path.resolve(__dirname, "src/components"),
  }),

  addWebpackResolve({
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url"),
      "buffer": require.resolve("buffer"),
    },
  }),

);
