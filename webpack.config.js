const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

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
  new ExtractTextPlugin('assets/style.css'),
  new CopyWebpackPlugin([{ from: 'src/assets/images', to: 'images' }])
];

if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  }));
} else {
  plugins.push(new HotModuleReplacementPlugin());
}


const config = {
  watch: !isProd,
  devtool: isProd ? 'cheap-source-map' : 'cheap-module-source-map',
  entry: {
    'redux-lenses-streaming-example': './src/redux/index.js',
  },
  output: {
    filename: isProd ? '[name].[hash].min.js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'lenses'),
    publicPath: '/lenses/',
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
              includePaths: [
                NODE_MODULES,
              ],
            },
          },
        ],
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
    host: 'localhost',
    port: 8000,
    contentBase: path.join(__dirname, 'lenses'),
    compress: true,
    historyApiFallback: true,
    inline: true,
    https: false,
    noInfo: true,
  }
};

module.exports = config;
