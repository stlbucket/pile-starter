<template>
  <div>
    <h1>License Manager</h1>
    <hr>
    <license-list-view></license-list-view>
  </div>
</template>

<script>
  import LicenseListView from '../App/LicenseListView/LicenseListViewVuetify.vue'

  export default {
    name: 'TheLicenseManager',
    components: {
      LicenseListView
    }
  }
</script>
