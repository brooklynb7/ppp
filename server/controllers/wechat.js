'use strict'

import WechatService from '../services/wechat'

/* API Controller */
const getJsConfig = async (ctx) => {
  const jsConfig = await WechatService.getJsConfig({
    jsConfigUrl: ctx.query.url,
    jsApiList: ['scanQRCode', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData']
  })

  ctx.body = jsConfig
}

export default {
  getJsConfig
}
