'use strict'

import Router from 'koa-router'
import PostController from '../controllers/post'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/posts`
})

export default app => {
  apiRouter.get('/mine', AuthController.requireAuthApi, PostController.getMyPosts)
  apiRouter.get('/parentbanji', AuthController.requireAuthApi, PostController.getParentBanjiPosts)
  apiRouter.post('/', AuthController.requireAuthApi, PostController.addPost)

  app.use(apiRouter.routes())
}
