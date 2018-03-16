'use strict'

import mount from 'koa-mount'
import Router from 'koa-trie-router'
import wechatApi from './controller'

const apiRouter = new Router()

export default app => {
  apiRouter.get('/api/wechat/createMenu', wechatApi.createMenu)
  apiRouter.get('/api/wechat/test', wechatApi.test)
  app.use(apiRouter.middleware())
  app.use(mount('/api/wechat', wechatApi.index))
}
