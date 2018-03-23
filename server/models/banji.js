'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'

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

export default {
  init: () => {
    mongoose.model('Banji', BanjiSchema)
  }
}
