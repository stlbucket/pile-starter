<template>
  <div>
    <appTenant-list-component
      :appTenants="appTenants"
    ></appTenant-list-component>
  </div>
</template>

<script>
import AppTenantListViewScript from './AppTenantListViewScript'
import AppTenantListComponent from '@/components/Auth/AppTenantList/AppTenantListVuetify'

export default {
  name: "AppTenantList",
  mixins: [AppTenantListViewScript],
  components: {
    AppTenantListComponent
  }
}
</script>
