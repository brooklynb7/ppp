'use strict'

const apiFactory = axios => ({
  login ({ username, password }) {
    return axios.$post('/auth/login', { username, password })
  },
  getWechatJsConfig (url) {
    return axios.$get(`/api/weixin/jsconfig?url=${url}`)
  },
  retrieveWxImgs (mediaIds) {
    return axios.$post(`/api/weixin/retrieveimgs`, {
      mediaIds: mediaIds.join(',')
    })
  },
  getPhotos () {
    return axios.$get(`/api/doctor/myphotos`)
  }
})

/*
** Executed by ~/.nuxt/index.js with context given
** This method can be asynchronous
*/
export default ({ $axios }, inject) => {
  // Inject `api` key
  // -> app.$api
  // -> this.$api in vue components
  // -> this.$api in store actions/mutations
  const api = apiFactory($axios)
  inject('api', api)
}