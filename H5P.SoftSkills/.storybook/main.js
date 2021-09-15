const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: async (config, { configType }) => {
    // Return the altered config
    return config;
  },
};
