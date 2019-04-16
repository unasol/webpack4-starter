const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = (env, options) => {
  return merge(common(env, options), {
    mode: "development",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "/",
    },
    devtool: "#eval-source-map",
    devServer: {
      compress: true,
      contentBase: "dist",
      historyApiFallback: true,
      hot: true,
      open: true,
      writeToDisk: true,
    },
    module: {
      // rules: [],
    },
  });
};
