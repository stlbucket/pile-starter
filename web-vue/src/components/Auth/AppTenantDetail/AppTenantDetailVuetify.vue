<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="appTenant"
  ></entity-detail-vuetify>
</template>

<script>
import AppTenantDetailScript from './AppTenantDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "AppTenantDetail",
  mixins: [AppTenantDetailScript],
  components: {
    EntityDetailVuetify
  },
  data () {
    return {
      fields: [
        {
          name: "name",
          label: "Name"
        },
        {
          name: "externalId",
          label: "External Id"
        },
      ]
    }
  }
}
</script>
