<template>
  <div>
    <appTenant-detail-component
      :appTenant="appTenant"
    ></appTenant-detail-component>
  </div>
</template>

<script>
import AppTenantDetailViewScript from './AppTenantDetailViewScript'
import AppTenantDetailComponent from '@/components/Org/AppTenantDetail/AppTenantDetailVuetify'


export default {
  name: "AppTenantDetailView",
  mixins: [AppTenantDetailViewScript],
  components: {
    AppTenantDetailComponent
  }
}
</script>
