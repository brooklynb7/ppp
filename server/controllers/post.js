'use strict'

import PostService from '../services/post'

/*
 * API Controller
 */

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

const getMyPosts = async (ctx) => {
  try {
    const posts = await PostService.queryPost({
      query: {
        user: ctx.state.user._id
      }
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
        banji: ctx.state.user.parentBanji ? ctx.state.user.parentBanji._id : ''
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

export default {
  addPost,
  getMyPosts,
  getParentBanjiPosts
}
