'use strict'

import moment from 'moment'
import * as _ from 'lodash'

const getProvider = (value) => {
  let rst = value
  switch (value) {
    case 'wechat':
      rst = '微信'
      break
    case 'local':
      rst = '后台'
      break
    default:
      break
  }
  return rst
}

const getWholeWeekdays = () => {
  const startDay = moment().startOf('isoWeek')
  const weekdays = [startDay.format('YYYY-MM-DD')]
  for (let i = 1; i < 5; i++) {
    weekdays.push(startDay.add(1, 'days').format('YYYY-MM-DD'))
  }
  return weekdays
}

const getWeekdayText = (date) => {
  const list = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const d = moment(date)
  return list[d.weekday()]
}

const getGradeList = () => {
  return [{ id: 1, text: '小班' }, { id: 2, text: '中班' }, { id: 3, text: '大班' }, { id: 0, text: '托班' }]
}

const getGradeText = (id) => {
  let text = ''
  const list = getGradeList()
  const grade = _.find(list, (item) => {
    return item.id === parseInt(id, 10)
  })
  if (grade) {
    text = grade.text
  }
  return text
}

const getRoleText = (item) => {
  let text = []
  if (item.isAdmin) {
    text.push('行政')
  }
  if (item.isTeacher) {
    text.push('老师')
  }
  if (item.isParent) {
    text.push('家长')
  }

  return text.join(',')
}

export default {
  getProvider,
  getWholeWeekdays,
  getWeekdayText,
  getGradeList,
  getGradeText,
  getRoleText
}
