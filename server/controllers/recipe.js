'use strict'

import RecipeService from '../services/recipe'

/*
 * API Controller
 */

const addRecipe = async (ctx) => {
  try {
    const recipeData = {
      date: ctx.request.body.date,
      detail: ctx.request.body.detail,
      memo: ctx.request.body.memo
    }

    const recipe = await RecipeService.addRecipe(recipeData)
    ctx.body = recipe
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

const queryRecipes = async (ctx) => {
  try {
    const query = {}
    const dates = ctx.query.dates
    let sort = '-date'
    if (dates) {
      query.date = { $in: dates.split(',') }
      sort = 'date'
    }

    const rst = await RecipeService.queryRecipe({
      query: query,
      sort: sort
    })
    ctx.body = rst
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const updateRecipe = async (ctx) => {
  try {
    const id = ctx.params.id
    const recipeData = ctx.request.body
    const rst = await RecipeService.updateRecipe(id, recipeData)
    ctx.body = rst
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const removeRecipe = async (ctx) => {
  try {
    const id = ctx.params.id
    const rst = await RecipeService.removeRecipe(id)
    ctx.body = rst
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  addRecipe,
  queryRecipes,
  updateRecipe,
  removeRecipe
}
