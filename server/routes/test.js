'use strict'

import Router from 'koa-router'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/test`
})

export default app => {
  apiRouter.get('/', async ctx => {
    ctx.body = { test: 1 }
  })

  app.use(apiRouter.routes())
}
