export const state = () => ({
  user: null,
  isAuthenticated: false,
  admin: null,
  isAuthAdmin: false,
  wechatJsConfig: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user || null
  },
  setAuthenticated (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  setAdmin (state, admin) {
    state.admin = admin || null
  },
  setAuthAdmin (state, isAuthAdmin) {
    state.isAuthAdmin = isAuthAdmin
  },
  setWechatJsConfig (state, config) {
    state.wechatJsConfig = config || null
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.state.user) {
      commit('setUser', req.state.user)
      commit('setAuthenticated', true)
    } else {
      commit('setUser', null)
      commit('setAuthenticated', false)
    }
  },

  async getWechatJsConfig ({ commit }, { url }) {
    try {
      const jsConfig = await this.$api.getWechatJsConfig(url)
      commit('setWechatJsConfig', jsConfig)
    } catch (error) {
      throw error.response
    }
  },

  async login ({ commit }, { username, password }) {
    try {
      const user = await this.$api.login({ username, password })
      commit('setUser', user)
      commit('setAuthenticated', true)
    } catch (error) {
      commit('setUser', null)
      commit('setAuthenticated', false)
      throw error.response.data.message
    }
  },

  async logout ({ commit }) {
    // await axios.post('/api/logout')
    commit('setUser', null)
    commit('setAuthenticated', false)
  }

}
