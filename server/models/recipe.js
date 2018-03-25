'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import DeepPopulate from 'mongoose-deep-populate'
const deepPopulate = DeepPopulate(mongoose)

const Schema = mongoose.Schema

/**
 * Recipe Schema
 */
const RecipeSchema = new Schema({
  date: {
    type: String,
    unique: true,
    required: true
  },
  detail: {
    type: String,
    default: ''
  },
  memo: {
    type: String,
    default: ''
  },
  createTime: {
    type: Number,
    default: Date.now
  }
})

RecipeSchema.plugin(deepPopulate, {
  populate: {

  }
})

export default {
  init: () => {
    mongoose.model('Recipe', RecipeSchema)
  }
}
