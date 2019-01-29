import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    isLoggedIn: false,
    currentAppUser: null
  },
  mutations: {
    login (state, payload) {
      state.currentAppUser = payload.currentAppUser
      state.isLoggedIn = payload.currentAppUser !== null && payload.currentAppUser !== undefined
    },
    logout (state) {
      state.isLoggedIn = false
      state.currentAppUser = null
    }
  },
  actions: {

  }
})
