'use strict'

import Router from 'koa-router'
import UserController from '../controllers/user'
import AdminController from '../controllers/admin'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const meApiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/me`
})

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/users`
})

const authRouter = new Router({
  prefix: `${nuxtConfig.router.base}auth`
})

export default app => {
  meApiRouter.get('/photos', AuthController.requireAuthApi, UserController.getMyPhotos)

  apiRouter.get('/default/add', UserController.addDefaultUser)
  apiRouter.get('/', AuthController.requireAdminAuthApi, UserController.queryUsers)
  apiRouter.get('/isteacher', AuthController.requireAdminAuthApi, UserController.getTeachers)
  apiRouter.get('/isparent', AuthController.requireAdminAuthApi, UserController.getParents)
  apiRouter.put('/:id/isteacher', AuthController.requireAdminAuthApi, UserController.updateUserIsTeacher)
  apiRouter.put('/:id/isparent', AuthController.requireAdminAuthApi, UserController.updateUserIsParent)
  apiRouter.put('/:id/isadmin', AuthController.requireAdminAuthApi, UserController.updateUserIsAdmin)
  apiRouter.put('/:id/parentinfo', AuthController.requireAuthApi, UserController.updateParentInfo)
  apiRouter.put('/:id/teacherinfo', AuthController.requireAuthApi, UserController.updateTeacherInfo)
  apiRouter.put('/:id/parentbanji', AuthController.requireAdminAuthApi, UserController.updateParentBanji)
  apiRouter.put('/:id/teacherbanjis', AuthController.requireAdminAuthApi, UserController.updateTeacherBanjis)
  apiRouter.delete('/:id', AuthController.requireAdminAuthApi, UserController.removeUser)

  authRouter.get('/wechat', UserController.signinWechat)
  authRouter.post('/login', UserController.login)
  authRouter.post('/loginAdmin', AdminController.login)

  app.use(meApiRouter.routes())
  app.use(apiRouter.routes())
  app.use(authRouter.routes())
}
