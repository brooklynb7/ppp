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
const queryUser = async ({ query, sort }) => {
  return base.queryEntryList({
    entry: User,
    query: query,
    select: '-salt -password',
    sort: sort
  })
}

const findOne = async (searchOptions) => {
  return User.findOne(searchOptions)
}

const findUserByUid = async (id) => {
  return User.findOne({
    _id: id
  }, '-salt -password')
}

const findLocalUserByUserName = async (username) => {
  return User.findOne({
    username: username,
    provider: 'local'
  })
}

const findUniqueUsername = async (possibleUsername) => {
  return User.findUniqueUsername(possibleUsername, null)
}

const addUser = async (userOptions) => {
  const user = new User(userOptions)
  const createdUser = await user.save()
  return createdUser
}

// Teacher parts
const getTeachers = async () => {
  return base.queryEntryList({
    entry: User,
    query: { isTeacher: true },
    select: '-salt -password',
    sort: '-created'
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
  return base.queryEntryList({
    entry: User,
    query: { isParent: true },
    select: '-salt -password',
    sort: '-created'
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
  updateTeacherInfo
}
