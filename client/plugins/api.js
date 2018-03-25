'use strict'

const apiFactory = axios => ({
  login ({ username, password }) {
    return axios.$post('/auth/login', { username, password })
  },
  loginAdmin ({ username, password }) {
    return axios.$post('/auth/loginAdmin', { username, password })
  },
  getWechatJsConfig (url) {
    return axios.$get(`/api/weixin/jsconfig?url=${url}`)
  },
  retrieveWxImgs (mediaIds) {
    return axios.$post(`/api/weixin/retrieveimgs`, {
      mediaIds: mediaIds.join(',')
    })
  },
  getMyPhotos () {
    return axios.$get(`/api/me/photos`)
  },
  getUsers () {
    return axios.$get(`/api/users`)
  },
  getTeachers () {
    return axios.$get(`/api/users/isteacher`)
  },
  getParents () {
    return axios.$get(`/api/users/isparent`)
  },
  updateUserIsTearch ({ id, isTeacher }) {
    return axios.$put(`/api/users/${id}/isteacher`, { isTeacher })
  },
  updateUserIsParent ({ id, isParent }) {
    return axios.$put(`/api/users/${id}/isparent`, { isParent })
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
