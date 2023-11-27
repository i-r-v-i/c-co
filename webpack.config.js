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
    devtool: isDev && "eval-source-map",
    devServer: isDev
      ? {
          static: path.resolve(__dirname, 'dist'),
          compress: true,
          port: env.port ?? 3000,
          open: true,
          hot: true,
          
        }
      : undefined,

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "public", "index.html"),
        favicon: path.resolve(__dirname, "public", "favicon.ico.svg"),
      }),
      new HtmlWebpackPlugin({
        filename: "menu.html",
        template: path.resolve(__dirname, "public", "menu.html"),
        favicon: path.resolve(__dirname, "public", "favicon.ico.svg"),
      }),
      new webpack.HotModuleReplacementPlugin(),
      isDev && new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
       
      }),
    ].filter(Boolean),
    
      
    module: {
      rules: [
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]'
          } 
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/img/[name][ext]'
            } 
          },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // Использование кэша для избежания рекомпиляции
              // при каждом запуске
            },
          },
          exclude: "/node_modules/",
      },
        {
          test: /\.css$/,
          use: [ isProd ? 'style-loader' : {loader: MiniCssExtractPlugin.loader, options: {} },"css-loader"],
        },
      ],
    },
  };
};
