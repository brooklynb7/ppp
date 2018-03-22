'use strict'

import Router from 'koa-router'
import WechatController from '../controllers/wechat'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/weixin`
})

export default app => {
  apiRouter.get('/jsconfig', WechatController.getJsConfig)
  app.use(apiRouter.routes())
}
