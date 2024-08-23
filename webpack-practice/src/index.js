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
    How do I automatically build HTML files in dist using Webpack
    How do I handle assets like local image files
Set up Webpack's development server
    What Webpack tool could I use during development to view changes to my website live
    How does using a source map help with development

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
import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);
