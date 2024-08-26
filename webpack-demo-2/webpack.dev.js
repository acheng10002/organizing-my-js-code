const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  // devtool for strong source mapping
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
});
