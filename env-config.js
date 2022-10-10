const debug = process.env.NODE_ENV !== 'production'
const name = 'https://github.com/matty255/next-blog'

module.exports = {
  'process.env.BACKEND_URL': !debug ? `/${name}` : '',
}
