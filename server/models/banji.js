'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import DeepPopulate from 'mongoose-deep-populate'
const deepPopulate = DeepPopulate(mongoose)

const Schema = mongoose.Schema

/**
 * Banji Schema
 */
const BanjiSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
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

BanjiSchema.plugin(deepPopulate, {
  populate: {

  }
})

export default {
  init: () => {
    mongoose.model('Banji', BanjiSchema)
  }
}
