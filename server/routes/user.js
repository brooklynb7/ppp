'use strict'

import Router from 'koa-router'
import UserController from '../controllers/user'

const apiRouter = new Router({
  prefix: '/api/users'
})

const authRouter = new Router({
  prefix: '/auth'
})

export default app => {
  apiRouter.get('/', async (ctx) => {
    ctx.body = { user: 1 }
  })
  // apiRouter.get('/default/add', admin.addDefaultAdmin)
  authRouter.get('/wechat', UserController.signinWechat)
  authRouter.get('/login', UserController.login)

  app.use(apiRouter.routes())

  app.use(authRouter.routes())
}
