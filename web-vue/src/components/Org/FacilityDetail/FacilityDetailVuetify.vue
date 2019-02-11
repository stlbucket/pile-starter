<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="facility"
  ></entity-detail-vuetify>
</template>

<script>
import FacilityDetailScript from './FacilityDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "FacilityDetail",
  mixins: [FacilityDetailScript],
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
