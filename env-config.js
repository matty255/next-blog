const debug = process.env.NODE_ENV !== 'production'
const name = 'https://matty255.github.io/next-blog'

module.exports = {
  'process.env.BACKEND_URL': !debug ? `/${name}` : '',
}
