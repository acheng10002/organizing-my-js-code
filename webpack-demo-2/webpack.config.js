const path = require('path');
// install the plugin
// npm install --save-dev html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // add src/print.js as a new entry point (print) 
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    mode: 'development',
    // inline-source-map is not good for production
    devtool: 'inline-source-map',
    // HtmlWebpackPlugin by default will generate its own index.html file and replace my index.html file
    // all the bundles will be automatically added

    // tells dev server where to look for files
    devServer: {
        // tells webpack-dev-server to serve the files from the dist directory on localhost:8080
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'Output Management',
            title: 'Development',
        }),
    ],
    output: {
        // change the output so that it will dynamically generate bundle names, based on the entry point names
        filename: '[name].bundle.js',
        // webpack-dev-server servers bundled files from the directory defined in out.path,
        // i.e. files will be available under http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
        path: path.resolve(__dirname, 'dist'),
        // it's good practice to clean the /dist folder before each build
        // use the output.clean option, npm run build, and then I should only see the files generated from the build and no more old files
        clean: true,
        // adjustment that makes sure the middleware will function correctly
        // publicPath will be used within my server script as well in order to make sure files are served correctly on http://localhost:3000
        // will specify port number later
        publicPath: '/',
    },
    // below was added because in this example, I have more than one entry point on a single HTML page
    // optimization: {
    //     runtimeChunk: 'single',
    // },
};

/* adding features is as easy as using the right plugins and loaders 

   after npm run build
   webpack generates my print.bundle.js and index.bundle.js files, which I also specified in my index.html */

/* Development
   
   Using source maps
   When webpack bundles my source code, it can become difficult to track down errors and warnings to their original location
   ex. I bundle three source files: a.js, b.js, and c.js into one bundle bundle.js
       one of the source files contains an arror, the stack trace will point to bundle.js
    stack trace - call stack/backtrace, diagnostic tool used to trace the sequence of function or method calls that led to an error or an exceptional condition,
                  typically an exception or runtime error
                  a stack trace provides a detailed record of how the program's execution reached the point where the error occurred 
    source map - JS maps my compiled code back to my original source code 
                 this makes it easier to track down errors and warnings
                 ex. if an error originates from b.js, the source map will tell me exactly that
    there are different options available when it comes to source maps, so I should check them out ans configure them to my needs

    Choosing a Development Tool
    It becomes a hassle to manually run npm run build every time I want to compile my code
    there are different options available in webpack that help me automatically compile my code whenever it changes
    Watch Mode
    webpack-dev-server
    webpack-dev-middleware
    in most cases I probably want to use webpack-dev-server
        
        Using Watch Mode
        I can instruct webpack to "watch" files within my dependency graph for changes
        if one of these files is updated, the code will be recompiled so I don't have to run the full build manually
        add an npm script that will start webpack's Watch Mode
        when I run npm run watch, webpack compiles my code, and it doesn't exit the command line because the script is currently watching my files

        Using webpack-dev-server
        with webpack-dev-server, I wouldn't have to refresh my browser to see the changes, and the changes would happen automatically
        webpack-dev-server provides me with a rudimentary web server and the ability to use live reloading 
        webpack-dev-server doesn't write any output files after compiling
        instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path
        if my page expects to find the bundle files on a different path, I can change it this with devMiddleware.publicPath option in the dev server's configuration

        Using webpack-dev-middleware
        webpack-dev-middleware - a wrapper that will emit files processed by webpack to a server
                                 this is used in webpack-dev-server internally, however it's available as a separate package to allow more custom setups if desired
                                 ex. one that combines webpack-dev-middleware with an express server
        add an npm script to make it a little easier to run the server
    
        Adjusting My Text Editor

        Conclusion
        I've learned how to automatically compile my code and run a development server

        Guides
        Done: Asset Management, Output Management, Development
        Not Done: Code Splitting, Caching, Authoring Libraries, Environmental Variables, Build Performance, Content Security Policies, Development - Vagrant,
                  Dependency Management, Installation, Hot Module Replacement, Tree Shaking, Production, Lazing Loading, ECMAScript Modules, Shimming, TypeScript,
                  Web Workers, Progressive Web Application, Public Path, Integrations, Asset Modules, Advanced entry, Package export

        hot module replacement -  tool that allows me to exchange, add, or remove modules during runtime without requirement a full page reload


*/