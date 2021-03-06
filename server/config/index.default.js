'use strict'

const dbname = process.env.NODE_ENV === 'test' ? 'koatest' : 'koa'

export default {
  app: {
    name: 'something',
    version: '1.0.0'
  },
  database: {
    driver: 'mongo',
    host: 'localhost',
    port: 27017,
    dbname: dbname,
    username: '',
    password: '',
    options: {
    }
  },
  server: {
    port: 3030
  },
  static_dir: {
    root: './static',
    options: {}
  },
  session: {
    a: 'a',
    secretKey: 'something'
  }
}
