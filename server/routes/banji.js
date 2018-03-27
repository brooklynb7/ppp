'use strict'

import Router from 'koa-router'
import BanjiController from '../controllers/banji'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/banjis`
})

export default app => {
  apiRouter.get('/', BanjiController.queryBanji)
  apiRouter.post('/', AuthController.requireAdminAuthApi, BanjiController.addBanji)
  apiRouter.put('/:id', AuthController.requireAdminAuthApi, BanjiController.updateBanji)

  app.use(apiRouter.routes())
}
