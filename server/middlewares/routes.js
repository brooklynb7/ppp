'use strict'

import routers from '../routes'
import mount from 'koa-mount'
import * as _ from 'lodash'

const jsonMiddleware = async (ctx, next) => {
  ctx.type = 'json'
  await next()
}

export default app => {
  app.use(mount('/api', jsonMiddleware))

  _.each(routers, (router) => {
    router(app)
  })
}
