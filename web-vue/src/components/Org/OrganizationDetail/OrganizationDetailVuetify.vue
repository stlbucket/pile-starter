<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="organization"
  ></entity-detail-vuetify>
</template>

<script>
import OrganizationDetailScript from './OrganizationDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "OrganizationDetail",
  mixins: [OrganizationDetailScript],
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
