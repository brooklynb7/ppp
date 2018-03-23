'use strict'

import Router from 'koa-router'
import DoctorController from '../controllers/doctor'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/doctor`
})

export default app => {
  apiRouter.get('/myphotos', AuthController.requireAuthApi, DoctorController.queryMyPhotos)

  app.use(apiRouter.routes())
}
