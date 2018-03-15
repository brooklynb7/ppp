'use strict'

// All middlewares are used here.
// Check other Koa official middlewares: https://github.com/koajs

import routes from './routes'
import serve from './static'
import parser from './parser'
import error from './error'
import apiJson from './api-json'
import logger from './logger'
import nuxt from './nuxt'

export default (app) => {
  parser(app)
  serve(app)
  logger(app)
  apiJson(app)
  routes(app)
  nuxt(app)
  error(app)
}
