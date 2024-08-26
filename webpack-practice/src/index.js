/* Explain the purpose of bundlers and how they work
Configure Webpack to bundle JS modules
    What is Webpack
        a bundler
        the bundler gets an entry point
        it builds a dependency graph from the entry point
        it combines all relevant files together
        then it outputs a single file with all the necessary code included
        the bundler can also minify my code, optimize my image, and even "tree shake"
    How do I bundle JS
        mkdir app
        touch page.json // for npm to record info about packages I use 
        npm init -y
        npm install --save-dev webpack webpack-cli
        mkdir src // inside app
        // work inside src
        run webpack // to output the bundled files into the dist directory
        // build into dist
Configure Webpack to handle non-JS files during bundling, including  using HtmlWebpackPlugin
    How do I load CSS using Webpack
        npm install --save-dev style-loader css-loader
        css-loader will read any CSS files we import in a JavaScript file and store the 
            result in a string
        style-loader then takes that string and actually adds the JavaScript code that 
            will apply those styles to the page
        add the two loaders to webpack.config.js
            tells Webpack to use the listed loadeers to process CSS files
        import CSS file as a side effect import
    How do I automatically build HTML files in dist using Webpack
        npm install --save-dev html-webpack-plugin (make sure Webpack config has access to it)
        create template.html inside src
        include html-webpack-plugin in webpack.config.js (add it as a plugin to the config object)
        in webpack.config.js, provide a path to src/template.html
        run npx webpack again
        dist directory will have a main.js and index.html
    How do I handle assets like local image files
        Image files used in our CSS inside url() - css-loader already handles this
        or Image files we reference in our HTML template, e.g. as the src of an <img>
            npm install --save-dev html-loader
        Images we use in our JavaScript, where we will need to import the files
            images need to be imported into my JS module
            images aren't JS, so Webpack needs to be told the files are assets by adding 
                an asset/resource rule
                in whatver JS module I want to use the image in, I have to default import it
                    the image needs 
Set up Webpack's development server
    What Webpack tool could I use during development to view changes to my website live
        webpack dev server
    How does using a source map help with development
        source map - tool that ensures error messages reference files and lines
             from development code and not the code inside my single
              bundled .js file 
              
eval-source-map adds a source map, that will also enable DevTools "Sources"
tab to show my original untouched code 

src directory is where all of my website's source code is
dist directory is where Webpack will output the files it bundled into
if someone were to fork or clone the project, they would not need the dist directory
    they'd run Webpack to build from src into their own dist
    (forking - creates a personal copy of someone else's repository on my own GitHub acct
     cloning - creating a local copy of a repository on my computer)
to deploy my own website, I only need the dist code and nothing else
    work inside src, build into dist, then deploy from there */

/* styles.css is a side effect import, don't need anything from the file, CSS and style 
loaders handle it */

import odinImage from "./odin.png";
import "./styles.css";
import { greeting } from "./greeting.js";

const image = document.createElement("img");

/* this way, the odinImage variable contain the correct file path 
if image.src = "./odin.png", Webpack will not recognize that this
string references a file and will not include it in the bundle 

I import it
set the correct asset/resource rule
Webpack recognizes the import
Webpack includes the image file when it bundles
I make the imported variable contain the correct file path at the end */
image.src = odinImage;

document.body.appendChild(image);

console.log(greeting);
