'use strict'

import Router from 'koa-router'
import UserController from '../controllers/user'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/users`
})

const authRouter = new Router({
  prefix: `${nuxtConfig.router.base}auth`
})

export default app => {
  apiRouter.get('/', async (ctx) => {
    ctx.body = { user: 1 }
  })

  apiRouter.get('/default/add', UserController.addDefaultUser)

  authRouter.get('/wechat', UserController.signinWechat)
  authRouter.post('/login', UserController.login)

  app.use(apiRouter.routes())

  app.use(authRouter.routes())
}
