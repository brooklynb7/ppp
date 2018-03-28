'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import banjiModel from '../models/banji'
import base from './base'
import UserService from './user'
import * as _ from 'lodash'

banjiModel.init()

const Banji = mongoose.model('Banji')

const queryBanji = async ({ query, sort }) => {
  return base.queryEntryList({
    entry: Banji,
    query: query,
    sort: sort || '-year grade name',
    deepPopulate: 'teachers'
  })
}

const findBanjiById = async (id) => {
  return Banji.findOne({ _id: id }).deepPopulate('teachers')
}

const addBanji = async (banjiData) => {
  const banji = new Banji({
    name: banjiData.name,
    teachers: banjiData.teachers || [],
    memo: banjiData.memo,
    grade: parseInt(banjiData.grade, 10),
    year: parseInt(banjiData.year, 10)
  })

  await banji.save()
  await UserService.appendBanjiToTeachers(banji.teachers, banji._id)
  return findBanjiById(banji._id)
}

const updateBanji = async (id, { name, teachers, year, grade, memo }) => {
  const banji = await Banji.findById(id)

  // Hanlde teachers add and remove
  const originalTeacherIds = _.map(banji.teachers, (item) => { return item.toString() })
  const intersections = _.intersection(teachers, originalTeacherIds)
  const newlyAdded = _.difference(teachers, intersections)
  const removed = _.difference(originalTeacherIds, intersections)
  console.log(intersections)
  console.log(newlyAdded)
  console.log(removed)

  await Promise.all([
    UserService.appendBanjiToTeachers(newlyAdded, banji._id),
    UserService.removeBanjiFromTeachers(removed, banji._id)]
  )

  await banji.update({
    name: name,
    teachers: teachers || [],
    grade: parseInt(grade, 10),
    year: parseInt(year, 10),
    memo: memo
  })
  return findBanjiById(banji._id)
}

export default {
  addBanji,
  queryBanji,
  updateBanji
}
