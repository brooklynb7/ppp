'use strict'

const apiFactory = axios => ({
  /* Auth API */
  login ({ username, password }) {
    return axios.$post('/auth/login', { username, password })
  },
  loginAdmin ({ username, password }) {
    return axios.$post('/auth/loginAdmin', { username, password })
  },
  /* Weixin API */
  getWechatJsConfig (url) {
    return axios.$get(`/api/weixin/jsconfig?url=${url}`)
  },
  retrieveWxImgs (mediaIds) {
    return axios.$post(`/api/weixin/retrieveimgs`, {
      mediaIds: mediaIds.join(',')
    })
  },
  /* Me API */
  getMyPhotos () {
    return axios.$get(`/api/me/photos`)
  },
  /* User API */
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
  },
  updateUserIsAdmin ({ id, isAdmin }) {
    return axios.$put(`/api/users/${id}/isadmin`, { isAdmin })
  },
  updateParentInfo (id, { parentName, mobile, memo }) {
    return axios.$put(`/api/users/${id}/parentinfo`, { parentName, mobile, memo })
  },
  updateTeacherInfo (id, { teacherName, mobile, memo }) {
    return axios.$put(`/api/users/${id}/teacherinfo`, { teacherName, mobile, memo })
  },
  updateParentBanji (id, banji) {
    return axios.$put(`/api/users/${id}/parentbanji`, { banji: banji })
  },
  removeUser (id) {
    return axios.$delete(`/api/users/${id}`)
  },
  /* Recipe API */
  addRecipe ({ date, detail, memo }) {
    return axios.$post(`/api/recipes`, { date, detail, memo })
  },
  getRecipes () {
    return axios.$get(`/api/recipes`)
  },
  getRecipesByDates (dates) {
    return axios.$get(`/api/recipes?dates=${dates.join(',')}`)
  },
  updateRecipe (id, { date, detail, memo }) {
    return axios.$put(`/api/recipes/${id}`, { date, detail, memo })
  },
  removeRecipe (id) {
    return axios.$delete(`/api/recipes/${id}`)
  },
  /* Banji API */
  addBanji ({ year, grade, name, teachers, memo }) {
    return axios.$post(`/api/banjis`, { name, year, grade, teachers: teachers.join(','), memo })
  },
  updateBanji (id, { year, grade, name, teachers, memo }) {
    return axios.$put(`/api/banjis/${id}`, { year, grade, name, teachers: teachers.join(','), memo })
  },
  getBanjis () {
    return axios.$get(`/api/banjis`)
  },
  /* Post API */
  addPost ({ status, photos, banji }) {
    return axios.$post(`/api/posts`, { banji, status, photos: photos.join(',') })
  },
  getMyPosts () {
    return axios.$get(`/api/posts/mine`)
  },
  getParentBanjiPosts () {
    return axios.$get(`/api/posts/parentbanji`)
  },
  getTeacherBanjiPosts () {
    return axios.$get(`/api/posts/teacherbanjis`)
  },
  removePost (id) {
    return axios.$delete(`/api/posts/${id}`)
  },
  addZanForPost (id) {
    return axios.$post(`/api/posts/${id}/zan`)
  },
  removeZanForPost (id) {
    return axios.$delete(`/api/posts/${id}/zan`)
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
