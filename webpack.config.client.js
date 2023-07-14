const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

const isDevelopment = process.env.NODE_ENV !== "production";
const config = {
  name: "browser",
  mode: isDevelopment ? "development" : "production",
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true/",
    path.join(CURRENT_WORKING_DIR, "client/main.js"),
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist"),
    filename: "bundle.js",
    publicPath: "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: { alias: { "react-dom": "@hot-loader/react-dom" } },
};
module.exports = config;
