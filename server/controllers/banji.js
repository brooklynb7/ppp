'use strict'

import BanjiService from '../services/banji'

/*
 * API Controller
 */

const addBanji = async (ctx) => {
  try {
    const teachers = ctx.request.body.teachers
    const banjiData = {
      name: ctx.request.body.name,
      teachers: teachers ? teachers.split(',') : [],
      grade: ctx.request.body.grade,
      year: ctx.request.body.year,
      memo: ctx.request.body.memo
    }

    const banji = await BanjiService.addBanji(banjiData)
    ctx.body = banji
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const queryBanji = async (ctx) => {
  try {
    const query = {}
    let sort = ''
    const rst = await BanjiService.queryBanji({
      query: query,
      sort: sort
    })
    ctx.body = rst
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

const updateBanji = async (ctx) => {
  try {
    const teachers = ctx.request.body.teachers
    const banjiData = {
      name: ctx.request.body.name,
      teachers: teachers ? teachers.split(',') : [],
      memo: ctx.request.body.memo,
      grade: ctx.request.body.grade,
      year: ctx.request.body.year
    }
    const rst = await BanjiService.updateBanji(ctx.params.id, banjiData)
    ctx.body = rst
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  addBanji,
  queryBanji,
  updateBanji
}
