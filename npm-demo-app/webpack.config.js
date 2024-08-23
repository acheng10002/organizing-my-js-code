module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "main.js",
    publicPath: "dist",
  },
  // this configures webpack to use babel-loader
  /* telling webpack to look for any .js files, excluding ones in node_modules, and apply 
  babel transpilation using babel-loader with the @babel-preset-env */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

/* each time I change index.js, I can run webpack with the command
./node_modules/.bin/webpack 
now without specifying options since webpack loads those from webpack.config.js */
