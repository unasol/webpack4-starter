const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PACKAGE = require("./package.json");

const HtmlWebPackPluginConfig = {
  title: PACKAGE.name,
  description: PACKAGE.description,
  url: PACKAGE.repository.repository,
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
  },
};

module.exports = (env, options) => {
  const isAddGTag = options.mode == "production";
  if (isAddGTag) HtmlWebPackPluginConfig.isAddGTag = true;
  return {
    entry: {
      index: ["@babel/polyfill", path.resolve(process.cwd() + "/src/index")],
    },
    resolve: {
      alias: {
        Assets: path.resolve(__dirname, "assets/"),
        Img: path.resolve(__dirname, "assets/img/"),
      },
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js)$/,
          include: [path.resolve("src")],
          exclude: [path.resolve("node_modules")],
          loader: "eslint-loader",
        },
        {
          test: /\.js$/,
          include: [path.resolve("src")],
          exclude: [path.resolve("node_modules")],
          loader: "babel-loader",
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
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
          test: /\.pug$/,
          use: ["pug-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg|woff(2)?|ttf|eot|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name() {
                  // if (options.mode === "development") {
                  //   return "[path][name].[ext]";
                  // }
                  return "[hash].[ext]";
                },
              },
            },
          ],
        },
      ],
    },
    target: "web",
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
    optimization: {
      splitChunks: {
        maxSize: 409600,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            enforce: true,
            priority: 1,
          },
          common: {
            name: "common",
            chunks: "all",
            enforce: true,
            priority: 0,
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new HtmlWebPackPlugin({
        ...HtmlWebPackPluginConfig,
        isDhowNavLinks: true,
        template: "./src/index.pug",
        filename: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };
};
