<template>
  <div id="app">
    <v-app id="inspire" dark>
      <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
        <app-menu></app-menu>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title><router-link :to="{ name: 'home'}">Phile-Starter</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <current-app-user-contact></current-app-user-contact>
        <login-manager></login-manager>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer app fixed>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div></template>

<script>
import AppMenu from '@/components/_common/AppMenu/AppMenuListVuetify'
import CurrentAppUserContact from '@/components/_common/CurrentAppUserContact/CurrentAppUserContactVuetify'
import LoginManager from '@/components/_common/LoginManager/LoginManagerVuetify'

export default {
  name: 'App',
  components: {
    CurrentAppUserContact,
    LoginManager,
    AppMenu
  },
  computed: {
  },
  methods: {
  },
  data () {
    return {
      drawer: true,
      hasToken: false
    }
  },
}
</script>
