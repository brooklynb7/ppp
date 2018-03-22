'use strict'

/*
 * API controllers
 */

const requireAuthApi = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'API not authenticated'
    }
  }
}

export default {
  requireAuthApi
}
