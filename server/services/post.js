'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import postModel from '../models/post'
import base from './base'

postModel.init()

const Post = mongoose.model('Post')

const queryPost = async ({ page, pageSize, query, sort }) => {
  return base.queryEntryList({
    entry: Post,
    query: query,
    page: page,
    pageSize: pageSize,
    sort: sort || '-createTime',
    deepPopulate: 'photos,banji,user'
  })
}

const addPost = async (postData) => {
  const post = new Post({
    status: postData.status,
    banji: postData.banji,
    user: postData.user,
    photos: postData.photos || []
  })

  await post.save()
  return post
}

const removePost = async (id, user) => {
  return Post.remove({
    _id: id,
    user: user
  })
}

const addZan = async (id, userId) => {
  return Post.update({
    _id: id,
    zan: {
      $ne: userId
    }
  }, {
    $push: { zan: userId }
  })
}

const removeZan = async (id, userId) => {
  return Post.update({
    _id: id,
    zan: userId
  }, {
    $pull: { zan: userId }
  })
}

export default {
  addPost,
  queryPost,
  removePost,
  addZan,
  removeZan
}
