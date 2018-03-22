'use strict'

import WechatService from '../services/wechat'
import fs from 'fs-extra'
import path from 'path'
import * as _ from 'lodash'

/* API Controller */
const getJsConfig = async (ctx) => {
  const jsConfig = await WechatService.getJsConfig({
    jsConfigUrl: ctx.query.url,
    jsApiList: ['scanQRCode', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData']
  })

  ctx.body = jsConfig
}

const retrieveWxImgs = async (ctx) => {
  const mediaIds = ctx.request.body.mediaIds
  const mediaIdArray = mediaIds.split(',')
  console.log(`mediaIdArray:${mediaIdArray.length}`)
  try {
    const retrievedWxImgs = await Promise.all(_.map(mediaIdArray, (id) => {
      return WechatService.getMedia(id)
    }))
    console.log(`retrievedWxImgs:${retrievedWxImgs.length}`)
    const retrievedWxImgsBuffer = _.filter(retrievedWxImgs, (wxImg) => {
      return Buffer.isBuffer(wxImg)
    })
    console.log(`retrievedWxImgsBuffer:${retrievedWxImgsBuffer.length}`)

    try {
      await Promise.all(_.map(retrievedWxImgsBuffer, (wxImg, idx) => {
        const filePath = path.resolve(`./static/photos/${ctx.state.user._id}/${Date.now()}-${idx}.png`)
        return fs.outputFile(filePath, wxImg)
      }))
    } catch (err) {
      console.log(err)
    }

    ctx.body = 'retrieved'
  } catch (err) {
    ctx.throw(500, err)
  }
}

export default {
  getJsConfig, retrieveWxImgs
}
