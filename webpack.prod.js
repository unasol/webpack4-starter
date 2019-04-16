const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require("./webpack.common.js");
const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");
const PACKAGE = require("./package.json");

module.exports = (env, options) => {
  return merge(common(env, options), {
    mode: "production",
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[id].[chunkhash].js",
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    devtool: "#source-map",
    module: {
      rules: [],
    },
    plugins: [
      new AppManifestWebpackPlugin({
        logo: "./assets/img/favicon-tmpl.png",
        inject: true,
        emitStats: true,
        prefix: "/icons/",
        output: "./icons/",
        config: {
          appName: PACKAGE.name,
          appDescription: PACKAGE.description,
          developerName: PACKAGE.author,
          background: "#fff",
          theme_color: "#fff",
          version: PACKAGE.version,
          lang: "es-ES",
          start_url: "/",
        },
      }),
    ],
  });
};
