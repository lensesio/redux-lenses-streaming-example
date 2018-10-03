const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENV = process.env.NODE_ENV || 'development';
const isProd = ENV === 'production';

console.log(`Building for ${ENV}`);

let plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(ENV) },
  }),
  new HtmlWebpackPlugin({
    template: './src/redux/index.html',
    filename: './index.html',
    excludeChunks: [],
  }),
  new MiniCssExtractPlugin({
    filename: isProd ? 'assets/css/[name].[hash].css' : 'assets/css/[name].css',
    chunkFilename: isProd ? 'assets/css/[id].[hash].css' : 'assets/css/[id].css',
  }),
  new CopyWebpackPlugin([{ from: 'src/assets/images', to: 'images' }])
];

if (isProd) {
  plugins.push(
    new CleanWebpackPlugin(['dist']),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    })
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

const config = {
  mode: !isProd ? 'development' : 'production',
  watch: !isProd,
  devtool: !isProd ? 'source-map' : false,
  entry: {
    'redux-lenses-streaming-example': './src/redux/index.js',
  },
  output: {
    filename: isProd ? "js/[name].[chunkhash].js" : "js/[name].[hash].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: isProd ? MiniCssExtractPlugin.loader : "style-loader"
        },
        {
          loader: "css-loader",
        },
        {
          loader: "sass-loader",
          options: {
            includePaths: ["src"]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: isProd ? MiniCssExtractPlugin.loader : "style-loader"
        },
        {
          loader: "css-loader"
        }]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
    modules: [
      'node_modules',
    ],
  },
  plugins,
  devServer: {
    host: "localhost",
    port: 8000,
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    hot: !isProd,
    inline: true,
    https: false,
    noInfo: false,
    progress: true
  }
};

module.exports = config;
