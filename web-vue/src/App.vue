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
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <current-app-user-contact></current-app-user-contact>
        <login-manager></login-manager>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div></template>

<script>
import {hasToken} from './vue-apollo.js'
import Home from './components/Home'
import AppMenu from './components/AppMenu/AppMenu/template/AppMenuDefault'
import CurrentAppUserContact from './components/AppUser/CurrentAppUserContact/template/CurrentAppUserContactDefault'
import LoginManager from './components/AppUser/LoginManager/template/LoginManagerDefault'

export default {
  name: 'App',
  components: {
    Home,
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
