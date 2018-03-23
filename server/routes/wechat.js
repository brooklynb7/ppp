'use strict'

import Router from 'koa-router'
import WechatController from '../controllers/wechat'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/weixin`
})

export default app => {
  apiRouter.get('/jsconfig', WechatController.getJsConfig)
  apiRouter.post('/retrieveimgs', AuthController.requireAuthApi, WechatController.retrieveWxImgs)
  apiRouter.get('/retrieveimg', AuthController.requireAuthApi, WechatController.retrieveWxImg)

  // apiRouter.use(AuthController.requireAuthApi)

  app.use(apiRouter.routes())
}
