'use strict'

import Router from 'koa-router'
import RecipeController from '../controllers/recipe'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/recipes`
})

export default app => {
  apiRouter.get('/', RecipeController.queryRecipes)
  apiRouter.post('/', AuthController.requireAdminAuthApi, RecipeController.addRecipe)
  apiRouter.put('/:id', AuthController.requireAdminAuthApi, RecipeController.updateRecipe)
  apiRouter.delete('/:id', AuthController.requireAdminAuthApi, RecipeController.removeRecipe)

  app.use(apiRouter.routes())
}
