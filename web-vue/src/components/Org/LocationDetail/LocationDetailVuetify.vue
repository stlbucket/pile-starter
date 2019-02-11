<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="location"
  ></entity-detail-vuetify>
</template>

<script>
import LocationDetailScript from './LocationDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "LocationDetail",
  mixins: [LocationDetailScript],
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
        {
          name: "address1",
          label: "Address 1"
        },
        {
          name: "address2",
          label: "Address 2"
        },
        {
          name: "city",
          label: "City"
        },
        {
          name: "state",
          label: "State"
        },
        {
          name: "zip",
          label: "Zip Code"
        },
        {
          name: "lat",
          label: "Latitude"
        },
        {
          name: "lon",
          label: "Longitude"
        },
      ]
    }
  }
}
</script>
