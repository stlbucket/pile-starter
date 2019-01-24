<template>
  <div>
    <v-tabs
      dark
      slider-color="yellow"
      :hidden="hidden"
    >
      <v-tab
        key="organization-list"
        ripple
      >
        Organizations
      </v-tab>
      <v-tab-item
        key="organization-list"
      >
        <organization-list></organization-list>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ABDashboardScript from './script/AddressBookScript'
import OrganizationList from '../../Org/OrganizationList/OrganizationListVuetify'

export default {
  name: "ABDashboard",
  components: {
    OrganizationList
  },
  mixins: [ABDashboardScript]
}
</script>
