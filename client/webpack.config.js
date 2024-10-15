const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          template: './index.html',
          name: 'JATE',
          inject: true,
        }),
        new InjectManifest({
          swSrc:'./src-sw.js',
          swDest: 'src-sw.js'
        }),

        new WebpackPwaManifest({
            name: 'Text Editor',
            inject: true,
            fingerprints: false,
            short_name: 'TextEditor',
            description: 'A simple text editor that works offline.',
            background_color: '#ffffff',
            theme_color: '#ffffff',
            display: 'standalone',
            publicPath: './',
            scope: '/',
            start_url: '/',
            icons: [
                {
                    src: path.resolve('src/images/logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons'),
                },
            ],
          }),
          new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        ],

        module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader',
                      options: {
                          presets: ['@babel/preset-env'],
                      },
                  },
              },
              {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader'],
              },
          ],
      },
  };
};
