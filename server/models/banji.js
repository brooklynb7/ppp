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
  year: {
    type: Number,
    required: true,
    default: 0
  },
  grade: {
    type: Number,
    required: true,
    default: 1
  },
  name: {
    type: String,
    unique: false,
    required: true
  },
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
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
    teachers: {
      select: 'name username realName'
    }
  }
})

export default {
  init: () => {
    mongoose.model('Banji', BanjiSchema)
  }
}
