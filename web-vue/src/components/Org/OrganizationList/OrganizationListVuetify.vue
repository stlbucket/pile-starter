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
import OrganizationListScript from './OrganizationListScript'
import EntityListVuetify from '../../_common/EntityListVuetify'

export default {
  name: "OrganizationList",
  mixins: [OrganizationListScript],
  components: {
    EntityListVuetify
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'Primary Contact', value: 'primaryContactName' }
      ],
      columns: [
        { 
          name: 'name', 
          routeLink: { 
            name: "organization-detail", 
            params: {
              id: 'id'
            }
          } 
        },
        { name: 'city' },
        { name: 'primaryContactName' },
      ]
    }
  }
}
</script>
