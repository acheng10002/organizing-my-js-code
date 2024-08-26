export const greeting = "Hello, Odinite!";

/* webpack - a static module bundler 
             it internally builds a dependency graph from one or more 
                entry points and then combines every module my project
                needs into one or more bundles 
                the bundles are static assets to serve my content from 
                
entry property - 
    entry point - the module that webpack uses to begin building out its
                    internal dependency graph 
                   webpack figures out which other modules and libraries that 
                        entry point depends on
                        default value is ./src/index.js

output property - 
    tells webpack where to emit the bundles
    defaults to ./dist/main.js for the main output file and to ./dist folder
        for any other generated file
    use output.filename and output.path properties
    const path = require('path')l // path module is a core Node.js module that
        gets used to manipulate file paths

loaders property -
    loaders - tools that allow webpack to process types of files other than JS 
              and JSON, and convert the files into valid modules that can be
              consumed by my app and added to the dependency graph
    test property of loaders - ids which file(s) should be transformed
    use property of loaders - indicates which loaders should be used to do the
                              transforming

plugins property -
    plugins - perform many different tasks
              bundle optimization, asset management, and injection of environment
                variables
    (environment variables - dynamic values that can affect the behavior of running
                             processes, such as a shell session or an operating system
                             session)
    need to require() a plugin to use it, and add it to the plugins array
        it gets called with a new operator, because the plugin can be used multiple 
        times in a configuration for different purposes

mode -
    either development, production, or none
    webpack has built-in optimizations that correspond to each environment
    default value is production

browser compatibility 
    Webpack needs Promise for import() and require.ensure() */
