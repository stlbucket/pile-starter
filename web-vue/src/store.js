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
    currentAppUserContact: null
  },
  mutations: {
    login (state, payload) {
      state.currentAppUserContact = payload.currentAppUserContact
      state.isLoggedIn = payload.currentAppUserContact !== null && payload.currentAppUserContact !== undefined
    },
    logout (state) {
      state.isLoggedIn = false
      state.currentAppUserContact = null
    }
  },
  actions: {

  }
})
