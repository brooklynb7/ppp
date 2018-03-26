'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import recipeModel from '../models/recipe'
import base from './base'

recipeModel.init()

const Recipe = mongoose.model('Recipe')

const queryRecipe = async ({ query, sort }) => {
  return base.queryEntryList({
    entry: Recipe,
    query: query,
    sort: sort
  })
}

const addRecipe = async (recipeData) => {
  const recipe = new Recipe({
    date: recipeData.date,
    detail: recipeData.detail,
    memo: recipeData.memo
  })
  return recipe.save()
}

const updateRecipe = async (id, recipeData) => {
  return Recipe.findOneAndUpdate({
    _id: id
  }, recipeData)
}

const removeRecipe = async (id) => {
  return Recipe.remove({
    _id: id
  })
}

export default {
  addRecipe,
  queryRecipe,
  updateRecipe,
  removeRecipe
}
