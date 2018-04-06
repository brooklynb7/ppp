'use strict'

import PostService from '../services/post'
import * as _ from 'lodash'

/*
 * API Controller
 */

const addTestPost = async (ctx) => {
  try {
    // const postData = {
    //   status: 'test',
    //   banji: '5ab9f0b6f864c86354c8ca9c',
    //   user: '5ab0b80deae6122afe72dcdb',
    //   photos: []
    // }

    for (let i = 1; i <= 5; i++) {
      await PostService.addPost({
        status: 'test' + i,
        banji: '5ab9f0b6f864c86354c8ca9c',
        user: '5ab4bc7b9d9cbdbeac5d22e2',
        photos: []
      })
    }

    // const post = await PostService.addPost(postData)
    ctx.body = 'ok'
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const addPost = async (ctx) => {
  try {
    const postData = {
      status: ctx.request.body.status,
      banji: ctx.request.body.banji,
      photos: ctx.request.body.photos.split(',') || []
    }

    postData.user = ctx.state.user._id

    const post = await PostService.addPost(postData)
    ctx.body = post
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const removePostByUser = async (ctx) => {
  try {
    const id = ctx.params.id
    const rst = await PostService.removePost(id, ctx.state.user._id)
    ctx.body = rst
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const getMyPosts = async (ctx) => {
  try {
    const page = ctx.query.page
    const pageSize = ctx.query.pageSize
    const posts = await PostService.queryPost({
      query: {
        user: ctx.state.user._id
      },
      page: page,
      pageSize: pageSize
    })
    ctx.body = posts
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const getParentBanjiPosts = async (ctx) => {
  try {
    const posts = await PostService.queryPost({
      query: {
        banji: ctx.state.user.parentBanji ? ctx.state.user.parentBanji._id : null
      },
      page: 0,
      pageSize: 5
    })
    ctx.body = posts
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const getTeacherBanjiPosts = async (ctx) => {
  try {
    const banjis = _.map(ctx.state.user.teacherBanjis, '_id')
    const posts = await PostService.queryPost({
      query: {
        banji: {
          $in: banjis
        }
      },
      page: 0,
      pageSize: 5
    })
    ctx.body = posts
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const addZan = async (ctx) => {
  try {
    const userId = ctx.state.user._id
    const postId = ctx.params.id
    await PostService.addZan(postId, userId)
    ctx.body = 'ok'
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const removeZan = async (ctx) => {
  try {
    const userId = ctx.state.user._id
    const postId = ctx.params.id
    await PostService.removeZan(postId, userId)
    ctx.body = 'ok'
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  addPost,
  getMyPosts,
  getTeacherBanjiPosts,
  getParentBanjiPosts,
  addTestPost,
  removePostByUser,
  addZan,
  removeZan
}
