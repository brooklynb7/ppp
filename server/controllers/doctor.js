'use strict'

import PhotoService from '../services/photo'

/*
 * API controllers
 */

const queryMyPhotos = async (ctx) => {
  try {
    const photos = await PhotoService.queryPhoto({
      query: {
        user: ctx.state.user._id.toString()
      },
      sort: '-createTime'
    })
    ctx.body = photos
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  queryMyPhotos
}
