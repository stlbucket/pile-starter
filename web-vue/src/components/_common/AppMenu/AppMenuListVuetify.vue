<template>
  <div>
    <v-list :hidden="!showAppList" dense>
      <v-list-tile 
        v-for="app in allowedAppList"
        @click="appSelected(app)"
        :key="app.key"
      >
        <v-list-tile-action>
          <v-icon>{{ app.iconKey }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ app.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <h2 :hidden="showAppList">Login for apps</h2>
  </div>
</template>

<script>
import AppMenuListScript from './AppMenuListScript'

export default {
  name: "AppMenuList",
  mixins: [AppMenuListScript]
}
</script>
