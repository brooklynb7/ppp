export const state = () => ({
  user: null,
  isAuthUser: false,
  admin: null,
  isAuthAdmin: false,
  wechatJsConfig: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user || null
  },
  setAuthUser (state, isAuthUser) {
    state.isAuthUser = isAuthUser
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
      commit('setAuthUser', true)
    } else {
      commit('setUser', null)
      commit('setAuthUser', false)
    }

    if (req.state.admin) {
      commit('setAdmin', req.state.admin)
      commit('setAuthAdim', true)
    } else {
      commit('setAdmin', null)
      commit('setAuthAdmin', false)
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
      commit('setAuthUser', true)
    } catch (error) {
      commit('setUser', null)
      commit('setAuthUser', false)
      throw error.response.data.message
    }
  },

  async loginAdmin ({ commit }, { username, password }) {
    try {
      const admin = await this.$api.loginAdmin({ username, password })
      commit('setAdmin', admin)
      commit('setAuthAdmin', true)
    } catch (error) {
      commit('setAdmin', null)
      commit('setAuthAdmin', false)
      throw error.response.data.message
    }
  },

  async logout ({ commit }) {
    // await axios.post('/api/logout')
    commit('setUser', null)
    commit('setAuthUser', false)
  }

}
