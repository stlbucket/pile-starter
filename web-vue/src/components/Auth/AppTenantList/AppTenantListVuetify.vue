<template>
  <div>
    <entity-list-vuetify
      :headers="headers"
      :items="items"
      :columns="columns"
    ></entity-list-vuetify>
  </div>
</template>

<script>
import AppTenantListScript from './AppTenantListScript'
import EntityListVuetify from '../../_common/EntityListVuetify'

export default {
  name: "AppTenantList",
  mixins: [AppTenantListScript],
  components: {
    EntityListVuetify
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'Primary Facility', value: 'primaryFacilityName' }
      ],
      columns: [
        { 
          name: 'name', 
          routeLink: { 
            name: "appTenant-detail", 
            params: {
              id: 'id'
            }
          } 
        },
        { name: 'city' },
        { name: 'primaryFacilityName' },
      ]
    }
  }
}
</script>
