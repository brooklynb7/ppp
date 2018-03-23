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

const requireAdminAuthApi = (ctx, next) => {
  if (ctx.state.admin) {
    return next()
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'Admin API not authenticated'
    }
  }
}

export default {
  requireAuthApi, requireAdminAuthApi
}
