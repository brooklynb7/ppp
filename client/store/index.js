'use strict'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      authUser: {
        name: 'test',
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'
      }
    },
    mutations: {
      increment (state) {
        state.counter++
      },
      setUser: function (state, user) {
        state.authUser = user
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (req.state.user) {
          commit('setUser', req.state.user)
        }
      }
    }
  })
}

export default createStore
