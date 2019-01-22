import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    authToken: null,
    currentAppUserContact: null
  },
  mutations: {
    authToken (state, payload) {
      state.authToken = payload.authToken
    },
    currentAppUserContact (state, payload) {
      state.currentAppUserContact = payload.currentAppUserContact
    },
    logout (state) {
      state.authToken = null
      state.currentAppUserContact = null
    }
  },
  actions: {

  }
})
