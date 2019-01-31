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
import ProjectListScript from './ProjectListScript'
import EntityListVuetify from '../../_common/EntityListVuetify'

export default {
  name: "ProjectList",
  mixins: [ProjectListScript],
  components: {
    EntityListVuetify
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Tenant', value: 'appTenantName' },
      ],
      columns: [
        { 
          name: 'name', 
          routeLink: { 
            name: "project-detail", 
            params: {
              id: 'id'
            }
          } 
        },
        { name: 'appTenantName' },
      ]
    }
  }
}
</script>
