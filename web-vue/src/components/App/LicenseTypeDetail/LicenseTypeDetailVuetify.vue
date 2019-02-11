<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="licenseType"
  ></entity-detail-vuetify>
</template>

<script>
import LicenseTypeDetailScript from './LicenseTypeDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "LicenseTypeDetail",
  mixins: [LicenseTypeDetailScript],
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
