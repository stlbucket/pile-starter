<template>
  <div>
    TENANT MANAGER
    <hr>
    <app-tenant-list-view></app-tenant-list-view>
  </div>
</template>

<script>
  import AppTenantListView from '../Auth/AppTenantListView/AppTenantListViewVuetify.vue'

  export default {
    name: 'TheLicenseManager',
    components: {
      AppTenantListView
    }
  }
</script>
