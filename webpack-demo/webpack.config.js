const path = require("path");

// configure toml, yamljs, and json5 in my webpack configuration
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "exclude": [
                // \\ for Windows, / for macOS and Linux
                /node_modules/core-js,
                /node_modules/webpack/buildin
              ],
            presets: [["@babel/preset-env", { targets: "defaults" }]]
          },
        },
      },
    ],
  },
};

/* Loading CSS
   in order to import a CSS file from within a JS module, I need to install and add the style-loader and css-loader to my module configuration
   
   module loaders can be chained 
   each loader in the chain applies transformations to the processed resource
   a chain is executed in reverse order 
   first loader passes its result (resource with applied transformations) to the next one, and so forth 
   webpack expects JS to be returned by the last loader in the chain
   'style-loader' should come first and followed by 'css-loader' 
   
   webpack uses a regular expression to determine which files it should look for and serve to a specific loader
   any file that ends with .css will be served to the style-loader and the css-loader 
   
   this enables me to import './style.css' into the file that depends on that styling 
   when the module is run, a <style> tag with stringified css will be inserted into the <head> of my html file 
   
   add a new style.css file to my project and import it in my index.js 
   
   when I inspect the page and look at the page's head tags, it should contain the style block that I imported in index.js 
   
   I can, and in most cases, should, minimize css for better load times in production 
   loaders exist for almost any flavor of CSS - postcss, sass, and less 

   Loading Images
   when I import MyImage from './my-image.png', that image will be processed and added to my output directory 
   and the MyImage variable will contain the final url of that image after processing 
   when using the css-loader, a similar process will occur for url('./my-image.png') within my CSS
    the loader will recognize this is a local file, and replace the './my-image.png' path with the final path to the image in my output directory
   the html loader handles <img src="./my-image.png" in the same manner
   
   after creating a new build, I should see icon as a repeating background, and an img element besides my Hello webpack text
   the actual filename has changed, which means webpack found my file in the src folder and processed it
   
   Loading Fonts
   Asset Modules will take any file I load through them and output to my build directory
   I can use the Asset Modules for any kind of file, including fonts

   Loading Data
   data file extensions: JSON files, CSVs, TSVs, and XML
   support for JSON is built-in, similar to NodeJS, meaning import Data from './data.json' will work by default
   to import CSVs, TSVs, and XML, I could use the csv-loader and xml-loader

   this can be especially helpful when implementing some sort of data visualization using a tool like d3
   instead of making an ajax request and parsing the data at runtime, I can load it into my module during the build process,
   so that the parsed data is ready to go as soon as the module hits the browser

        Customiz parser of JSON modules
        use a custom parser to import any toml, yaml, or json5 files as a JSON module, instead of a specific webpack loader

   Global Assets
   instead of relying on a global /assets directory, I can group assets with the code that uses them
   everything that is closely coupled can live together
   if I want to use /my-component in another project, I can copy or move into the /components directory over there
   as long as I've installed any external dependencies and my configuration has the same loaders defined, I should be good to go

   if I have some assets that are shared between multiple components (view, templates, modules, etc.), 
   it's still possible to store these assets in a base directory, and even use aliasing to make them easier to import
   */
