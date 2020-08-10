const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: [resolvePath('../dist'), resolvePath('../app/public')]
  },
  security: {
    csrf: {
      enable: false,
    },
  },
  cors: {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
}
