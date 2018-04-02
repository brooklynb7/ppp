'use strict'

import wechatConfig from './config.wechat'
import OAuth from 'wechat-oauth'
const client = new OAuth(wechatConfig.appId, wechatConfig.appSecret)

const createWechatOAuthUrl = function (cbUrlPath) {
  return client.getAuthorizeURL(wechatConfig.host + '/auth/wechat?cb=' +
    encodeURIComponent(wechatConfig.url + cbUrlPath), '1', 'snsapi_userinfo')
}

export default {
  host: wechatConfig.host,
  port: 3031,
  token: wechatConfig.token,
  appId: wechatConfig.appId,
  appSecret: wechatConfig.appSecret,
  aseKey: wechatConfig.aseKey,
  account: wechatConfig.account,
  msgType: {
    event: 'event',
    text: 'text',
    location: 'location'
  },
  event: {
    subscribe: 'subscribe',
    click: 'CLICK',
    view: 'VIEW',
    scan: 'SCAN'
  },
  mp_url: 'https://mp.weixin.qq.com/',
  mp_login_url: 'https://mp.weixin.qq.com/cgi-bin/login?lang=zh_CN',
  subscribeMsg: '感谢您的关注',
  menuButton: {
    menu1: {
      name: '我是家长'
    },
    menu2: {
      name: '我是老师'
    },
    menu3: {
      name: '意见反馈'
    },
    teacherMe: {
      name: '我的设置',
      url: createWechatOAuthUrl('/teacher')
    },
    teacherCamera: {
      name: '发布动态',
      url: createWechatOAuthUrl('/teacher/camera')
    },
    teacherPhotos: {
      name: '我的发布',
      url: createWechatOAuthUrl('/teacher/photos')
    },
    admin: {
      name: '行政管理',
      url: createWechatOAuthUrl('/admin')
    },
    recipes: {
      name: '本周食谱',
      url: createWechatOAuthUrl('/parent/recipes')
    },
    banjiPosts: {
      name: '班级动态',
      url: createWechatOAuthUrl('/parent/banjiPosts')
    },
    parentMe: {
      name: '我的设置',
      url: createWechatOAuthUrl('/parent')
    },
    doFeedback: {
      name: '我要反馈',
      url: createWechatOAuthUrl('/feedback')
    },
    myFeedback: {
      name: '我的反馈',
      url: createWechatOAuthUrl('/feedback/mine')
    },
    test: {
      name: 'test',
      url: createWechatOAuthUrl('/teacher/test')
    }
  }
}
