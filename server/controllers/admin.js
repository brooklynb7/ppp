'use strict'

import AdminService from '../services/admin'
import util from '../utils'

/*
 * API Controller
 */

const queryAdmin = async (ctx) => {
  try {
    const admins = await AdminService.queryAdmin()
    ctx.body = admins
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

const addDefaultAdmin = async (ctx) => {
  try {
    const admin = await AdminService.addAdmin({
      name: 'admin',
      password: '123456'
    })
    ctx.body = admin
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

/* Auth Controller */
const login = async (ctx) => {
  try {
    const name = ctx.body.username
    const password = util.md5(ctx.body.password)
    const admin = await AdminService.findAdmin({ name, password })
    ctx.state.admin = admin
    if (admin) {
      ctx.body = admin
    } else {
      ctx.status = 401
      ctx.body = {
        message: 'Admin Unauthenticated'
      }
    }
  } catch (err) {
    ctx.state.admin = null
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  queryAdmin, addDefaultAdmin, login
}
