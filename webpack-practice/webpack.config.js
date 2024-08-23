/* Webpack config file contains all details I need for bundling
the entry point, the output destination, and anything like plugins 
and loaders 

this file uses CommonJS because this file and Webpack runs in 
NodeJS and not the browser 
NodeJS uses CJS syntax 

clean - when set to true, empties the output directory first 
        before bundling the files into it 
        
makes sure that the Webpack config has access to HtmlWebpackPlugin 
then adding it as a plugin to the config object 
inside the HtmlWebpackPlugin constructor call, pass in any options, 
for now, only interested in the template option */

/* css-loader - reads any CSS files I import in a JS file and stores 
                the result in a string
style-loader - takes that string and actually adds the JS code that 
               will apply those styles to the page 

Webpack is told that if it encounters an imported file ending with 
.css, use the listed loaders to process that CSS file
Order matters, webpack runs the loaders starting at the end
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
