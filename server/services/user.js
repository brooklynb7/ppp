'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import userModel from '../models/user'
import base from './base'

userModel.init()

const User = mongoose.model('User')

const queryUser = async ({ query, sort }) => {
  return base.queryEntryList({
    entry: User,
    query: query,
    select: '-salt -password',
    sort: sort
  })
}

const getTeachers = async () => {
  return base.queryEntryList({
    entry: User,
    query: { isTeacher: true },
    select: '-salt -password',
    sort: '-created'
  })
}

const getParents = async () => {
  return base.queryEntryList({
    entry: User,
    query: { isParent: true },
    select: '-salt -password',
    sort: '-created'
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

const updateUserIsTeacher = async ({ id, isTeacher }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { isTeacher: !!isTeacher })
}

const updateUserIsParent = async ({ id, isParent }) => {
  return User.findOneAndUpdate({
    _id: id
  }, { isParent: !!isParent })
}

const addUser = async (userOptions) => {
  const user = new User(userOptions)
  const createdUser = await user.save()
  return createdUser
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
  updateUserIsParent
}
