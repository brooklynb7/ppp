'use strict'

import mount from 'koa-mount'
import Router from 'koa-trie-router'

const apiRouter = new Router()

export default app => {
  apiRouter.get('/', async ctx => {
    ctx.body = { test: 1 }
  })

  app.use(mount('/api/test', apiRouter.middleware()))
}
