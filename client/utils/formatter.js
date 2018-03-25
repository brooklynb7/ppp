'use strict'

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

export default {
  getProvider
}
