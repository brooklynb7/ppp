'use strict'

import Router from 'koa-router'
import PostController from '../controllers/post'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/posts`
})

export default app => {
  apiRouter.get('/test/add', AuthController.requireAdminAuthApi, PostController.addTestPost)
  apiRouter.get('/mine', AuthController.requireAuthApi, PostController.getMyPosts)
  apiRouter.get('/parentbanji', AuthController.requireAuthApi, PostController.getParentBanjiPosts)
  apiRouter.get('/teacherbanjis', AuthController.requireAuthApi, PostController.getTeacherBanjiPosts)
  apiRouter.post('/', AuthController.requireAuthApi, PostController.addPost)
  apiRouter.delete('/:id', AuthController.requireAuthApi, PostController.removePostByUser)

  app.use(apiRouter.routes())
}
