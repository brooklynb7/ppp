'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import userModel from '../models/user'
import base from './base'
import * as _ from 'lodash'

userModel.init()

const User = mongoose.model('User')

// User parts
const queryUser = async ({ query, sort, deepPopulate }) => {
  return base.queryEntryList({
    entry: User,
    query: query,
    select: '-salt -password',
    deepPopulate: deepPopulate || 'parentBanji,teacherBanjis',
    sort: sort
  })
}

const findOne = async (searchOptions) => {
  return User.findOne(searchOptions).select('-salt -password').deepPopulate('parentBanji,teacherBanjis')
}

const findUserByUid = async (id) => {
  return User.findOne({
    _id: id
  }).select('-salt -password').deepPopulate('parentBanji,teacherBanjis')
}

const findLocalUserByUserName = async (username) => {
  return User.findOne({
    username: username,
    provider: 'local'
  }).deepPopulate('parentBanji,teacherBanjis')
}

const findUniqueUsername = async (possibleUsername) => {
  return User.findUniqueUsername(possibleUsername, null)
}

const addUser = async (userOptions) => {
  const user = new User(userOptions)
  const createdUser = await user.save()
  return createdUser
}

const updateUserPwd = async () => {
  const user = await User.findOne({ username: 'test2' })
  user.password = '123456'
  return user.save()
}

// Teacher parts
const getTeachers = async () => {
  return queryUser({
    sort: '-created',
    deepPopulate: 'teacherBanjis',
    query: {
      isTeacher: true
    }
  })
}

const updateUserIsTeacher = async ({ id, isTeacher }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { isTeacher: !!isTeacher })
}

const updateUserIsAdmin = async ({ id, isAdmin }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { isAdmin: !!isAdmin })
}

const appendTeacherBanji = async (userId, banjiId) => {
  const user = await findOne({
    _id: userId
  })
  if (!_.includes(user.teacherBanjis, banjiId)) {
    user.teacherBanjis.push(banjiId)
    await user.save()
  }
  return user
}

const appendBanjiToTeachers = async (userIds, banjiId) => {
  return User.update({
    _id: {
      $in: userIds
    },
    teacherBanjis: {
      $ne: banjiId
    }
  }, {
    $push: { teacherBanjis: banjiId }
  }, { multi: true })
}

const removeBanjiFromTeachers = async (userIds, banjiId) => {
  return User.update({
    _id: {
      $in: userIds
    },
    teacherBanjis: banjiId
  }, {
    $pull: { teacherBanjis: banjiId }
  }, { multi: true })
}

// Parent parts
const getParents = async () => {
  return queryUser({
    sort: '-created',
    deepPopulate: 'parentBanji',
    query: {
      isParent: true
    }
  })
}

const updateUserIsParent = async ({ id, isParent }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { isParent: !!isParent })
}

const updateParentInfo = async (id, { parentName, mobile, memo }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { parentName, mobile, memo })
}

const updateTeacherInfo = async (id, { teacherName, mobile, memo }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { teacherName, mobile, memo })
}

const updateParentBanji = async (id, banji) => {
  await User.findOneAndUpdate({
    _id: id
  }, { parentBanji: banji })

  return findUserByUid(id)
}

const removeUser = async (id) => {
  return User.remove({
    _id: id
  })
}

export default {
  addUser,
  queryUser,
  getTeachers,
  getParents,
  findLocalUserByUserName,
  findUserByUid,
  findOne,
  findUniqueUsername,
  updateUserIsTeacher,
  updateUserIsParent,
  updateUserIsAdmin,
  appendTeacherBanji,
  appendBanjiToTeachers,
  removeBanjiFromTeachers,
  updateParentInfo,
  updateTeacherInfo,
  updateParentBanji,
  updateUserPwd,
  removeUser
}
