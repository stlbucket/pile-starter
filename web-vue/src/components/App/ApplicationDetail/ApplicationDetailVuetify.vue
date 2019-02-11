<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="application"
  ></entity-detail-vuetify>
</template>

<script>
import ApplicationDetailScript from './ApplicationDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "ApplicationDetail",
  mixins: [ApplicationDetailScript],
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
          name: "key",
          label: "Key"
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
