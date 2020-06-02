var path = require('path');
module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    cjs: false,
    umd: {
      global: 'H5P.SoftSkills',
    }
  },
  webpack: {
    extra: {
      entry: {
        dist: process.env.NODE_ENV == 'development' ? './demo/src/index.js' : './src/index.js',
      },
      output: {
        filename: 'h5p-softskills.js',
      },
    },
    rules: {
      svg: {
        loader: 'url-loader',
        options: {
          limit: undefined, // This is to ensure that the
        },
      }
    },
    extractCSS: {
      filename: 'h5p-softskills.css',
    },
  }
};
