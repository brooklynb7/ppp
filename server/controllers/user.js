'use strict'

import passport from 'koa-passport'
import UserService from '../services/user'

const login = async (ctx) => {
  ctx.body = 'login'
  // return ctx.login({ _id: 'a', name: 'a' })
}

const signinWechat = async (ctx) => {
  return passport.authenticate('wechat', async (err, user) => {
    if (err) {
      return ctx.throw(err)
    }
    if (ctx.query.cb) {
      ctx.redirect(ctx.query.cb)
    } else {
      ctx.body = 'No callback url'
    }

    return ctx.login(user)
  })(ctx)
}

/**
* Helper function to save or update a OAuth user profile
*/
const saveOAuthUserProfile = async (providerUserProfile, done) => {
  // Define a search query fields
  var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField
  var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' +
    providerUserProfile.providerIdentifierField

  // Define main provider search query
  var mainProviderSearchQuery = {}
  mainProviderSearchQuery.provider = providerUserProfile.provider
  mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField]

  // Define additional provider search query
  var additionalProviderSearchQuery = {}
  additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] =
    providerUserProfile.providerData[providerUserProfile.providerIdentifierField]

  // Define a search query to find existing user with current provider profile
  var searchQuery = {
    $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
  }

  try {
    let foundUser = await UserService.findOne(searchQuery)
    if (!foundUser) {
      const possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '')

      const availableUsername = await UserService.findUniqueUsername(possibleUsername)

      foundUser = {
        username: availableUsername,
        password: 'Welcome1!',
        gender: providerUserProfile.gender,
        avatar: providerUserProfile.avatar,
        name: providerUserProfile.displayName,
        email: providerUserProfile.email,
        provider: providerUserProfile.provider,
        providerData: providerUserProfile.providerData
      }
      const createdUser = await UserService.addUser(foundUser)
      return done(null, createdUser)
    } else {
      return done(null, foundUser)
    }
  } catch (err) {
    return done(err)
  }
}

/*
 * API controllers
 */

export default {
  saveOAuthUserProfile, signinWechat, login
}
