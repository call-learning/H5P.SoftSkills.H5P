// jest.config.js
module.exports = {
  verbose: true,
  transform: {
    "^.+\\.js$": [
      "babel-jest",{
        presets: [
          '@babel/env',
          '@babel/react'
        ],
        plugins: [
          ['@babel/proposal-class-properties', { 'loose': true }],
          ['@babel/proposal-private-property-in-object', { 'loose': true }],
        ]
    }],
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "^.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
};
