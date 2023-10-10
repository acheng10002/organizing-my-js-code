/* tutorial examples of using webpage to manage my website’s assets/ Asset Management
   before webpack, front-end devs used tools like grunt and gulp to process these assets and move them from their /src folder into their /dist or /build directory
   webpack dynamically bundles all dependencies
        every module now explicitly states its dependencies, and I'll acoid bundling modules that aren't in use
    **I can include any other type of files, besides JS
      there is a loader or built-in Asset Modules support
      the same benefits listed above for JS (e.g. explicit dependencies) can be applied to everything used in building a website or web app
   Setup
   Loading CSS
   in order to import a CSS file from within a JS module, I need to install and add the style-loader and css-loader to my module configuration

   Loading Images
   using the built-in Asset Modules, I can easily incorporate backgrounds and icons into my system

   Loading Fonts
   Loading Data
        Customize parser of JS
   Global Assets
   Wrapping up
   Next Guide
   Further Reading
*/