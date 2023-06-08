const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // Other webpack configurations...
  plugins: [
    new NodePolyfillPlugin(),
  ],
};

const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Other Webpack configurations...

  // Add the externals option
  externals: [nodeExternals()],

  // Other Webpack configurations...
};
module.exports = {
  // Other webpack configurations...
  resolve: {
    fallback: {
      "process": require.resolve('process/browser')
    }
  }
};

module.exports = {
  resolve: {
      fallback: {
          assert: require.resolve('assert'),
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify/browser'),
          stream: require.resolve('stream-browserify'),
      },
  },
};