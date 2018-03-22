'use strict'
import config from '../wechat/config'
import API from 'co-wechat-api'
const api = new API(config.appId, config.appSecret)

const getJsConfig = async (params) => {
  return api.getJsConfig({
    debug: false,
    jsApiList: params.jsApiList,
    url: params.jsConfigUrl
  })
}

export default {
  getJsConfig
}
