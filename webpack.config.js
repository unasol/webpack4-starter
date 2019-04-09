const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");
const PACKAGE = require("./package.json");
const path = require("path");
module.exports = (env, options) => {
  return {
    resolve: {
      alias: {
        Assets: path.resolve(__dirname, "assets/"),
      },
    },
    entry: {
      index: path.resolve(process.cwd() + "/src/index"),
    },
    output: {
      publicPath: "/",
      path: path.resolve(process.cwd(), "dist"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {minimize: true},
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
            "postcss-loader",
          ],
        },
        {
          test: /\.pug$/,
          use: ["pug-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name(file) {
                  if (options.mode === "development") {
                    return "[path][name].[ext]";
                  }
                  return "[hash].[ext]";
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.pug",
        filename: "./index.html",
        chunks: ["index"],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
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
  };
};
