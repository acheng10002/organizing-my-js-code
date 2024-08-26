const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  /* loads TerserPlugin */
  mode: "production",
  /* as opposed to "inline-source-map" used in development 
  inline-*** in production, may increase bundle size and reduce overall performance */
  devtool: "source-map",
});

/* Webpack v4+ will minify my code by default in production mode 
source maps are useful for debugging as well as running benchmark tests 

crucial to minimize CSS for production 

npx webpack --help=verbose for a full list of CLI argument */
