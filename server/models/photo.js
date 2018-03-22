'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Photo Schema
 */
const PhotoSchema = new Schema({
  fileName: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
    mongoose.model('Photo', PhotoSchema)
  }
}
