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
import FacilityListScript from './FacilityListScript'
import EntityListVuetify from '../../_common/EntityListVuetify'

export default {
  name: "FacilityList",
  mixins: [FacilityListScript],
  components: {
    EntityListVuetify
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'Organization', value: 'organizationName' }
      ],
      columns: [
        { 
          name: 'name',
          routeLink: { 
            name: "facility-detail", 
            params: {
              id: 'id'
            }
          } 
        },
        { name: 'city' },
        { name: 'organizationName' },
      ]
    }
  } 
}
</script>
