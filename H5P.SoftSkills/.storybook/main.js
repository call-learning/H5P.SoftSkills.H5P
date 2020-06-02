const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: async (config, { configType }) => {
    // Same as production: load the image or assets files
    config.module.rules.push({
      test:  /\.(png|jpg|gif)$/i,
      use: [
      {
        loader: 'url-loader',
        options: {
          limit: true,
        },
      }],
      include: path.resolve(__dirname,'../assets')
    });

    // Return the altered config
    return config;
  },
};
