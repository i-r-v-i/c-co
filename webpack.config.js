const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = (env) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    resolve: {
      extensions: [".js"],
    },
    devtool: isDev && "inline-source-map",
    devServer: isDev
      ? {
          // static: path.resolve(__dirname, 'dist'),
          // compress: true,
          // hot: true,
          port: env.port ?? 5000,
          open: true,
        }
      : undefined,

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev && new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.js$/,
          // при обработке этих файлов нужно использовать babel-loader
          use: "babel-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.css$/,
          use: [ isProd ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
  };
};
