const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry point
  entry: {
    app: "./src/index.js",
  },
  // plugins required for both development and production environments
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
    }),
  ],
  // bundled output file
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
