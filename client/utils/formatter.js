'use strict'

import moment from 'moment'

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

export default {
  getProvider,
  getWholeWeekdays,
  getWeekdayText
}
