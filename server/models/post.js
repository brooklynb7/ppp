'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import DeepPopulate from 'mongoose-deep-populate'
const deepPopulate = DeepPopulate(mongoose)

const Schema = mongoose.Schema

/**
 * Post Schema
 */
const PostSchem = new Schema({
  status: {
    type: String,
    required: true
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  banji: {
    type: Schema.Types.ObjectId,
    ref: 'Banji'
  },
  zan: [{
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

PostSchem.plugin(deepPopulate, {
  populate: {
    user: 'name username realName teacherName parentName'
  }
})

export default {
  init: () => {
    mongoose.model('Post', PostSchem)
  }
}
