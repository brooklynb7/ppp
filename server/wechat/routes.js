'use strict'

// import mount from 'koa-mount'
import Router from 'koa-trie-router'
// import wechatApi from './controller'

const apiRouter = new Router()

export default app => {
  apiRouter.get('/api/wechat/createMenu', async ctx => {
    ctx.body = { wechatTest: 1 }
  })
  // app.use(mount('/api/wechat/', wechatApi.index))
  app.use(apiRouter.middleware())
}
