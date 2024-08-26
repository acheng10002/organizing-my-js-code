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
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
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
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};

/* other things that may need a special loader or plugin, 
custom fonts or preprocessors 

webpack-dev-server - bundles my code behind the scenes, as if I ran npx 
                     webpack, but without saving the files to dist 
it does this every time I save a file that's used in the bundle 
source map - tool that ensures error messages reference files and lines
             from development code and not the code inside my single
              bundled .js file 
              
eval-source-map adds a source map, that will also enable DevTools "Sources"
tab to show my original untouched code 

webpack-dev-server will only auto-restart when it detects any changes to 
files I import into my JS bundle, so my HTML template will be ignored, 
did thisby adding the HTML file to the dev server's array of watched files
npx webpack serve */
