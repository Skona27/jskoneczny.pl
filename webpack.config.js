const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js", "./src/sass/index.scss" ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader' ]
      },
      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "[name].[ext]",
              outputPath: "./assets/img",
              publicPath: "./img"
            },
          },
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 28192,
              name: "[name].[ext]",
              outputPath: "./assets/fonts",
              publicPath: "./fonts"
            },
          }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./assets/style.css"
    }),
    new CopyWebpackPlugin([
      {from:'src/img',to:'./assets/img'} 
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '30-65'
      }
    }) 
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJSPlugin({}),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: false
        }
      }),
    ]
  },
  devServer: {
    contentBase: "./dist"
  },
};