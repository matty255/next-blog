// import env from './env-config'

const env = require('./env-config')

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['transform-define', env],
    [
      'babel-plugin-styled-components',
      {
        fileName: true,
        displayName: true,
        pure: true,
      },
    ],
  ],
}
