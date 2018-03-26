'use strict'

import crypto from 'crypto'
import moment from 'moment'
import * as _ from 'lodash'

const isValidPassword = (password) => {
  return (password && password.length >= 6)
}

const md5 = (text) => {
  return crypto.createHash('md5').update(text).digest('hex')
}

const getWholeWeekdays = () => {
  const startDay = moment().zone('+0800').startOf('isoWeek')
  const weekdays = [startDay]
  for (let i = 1; i < 5; i++) {
    weekdays.push(startDay.add(i, 'days'))
  }
  return _.map(weekdays, (day) => {
    return day.format('YYYY-MM-DD')
  })
}

export default {
  md5: md5,
  isValidPassword: isValidPassword,
  getWholeWeekdays: getWholeWeekdays
}
