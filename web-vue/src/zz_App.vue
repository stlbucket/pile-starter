<template>
  <div id="app">
    <v-app id="inspire" dark>
      <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-tile @click="dashboard">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="settings">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <home></home>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div></template>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  methods: {
    dashboard () {
      alert('dashboard')
    },
    settings () {
      alert('settings')
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>
