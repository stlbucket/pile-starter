<template>
  <div>
    <h1>Name: {{ appTenant.name }}</h1>
    <hr>
    <!-- <v-tabs
      dark
      slider-color="yellow"
    >
      <v-tab
        key="contact-list"
        ripple
      >
        Contacts
      </v-tab>
      <v-tab-item
        key="contact-list"
      >
        <contact-list
          :contacts="contacts"
        ></contact-list>
      </v-tab-item>
      <v-tab
        key="facility-list"
        ripple
      >
        Facilities
      </v-tab>
      <v-tab-item
        key="facility-list"
      >
        <facility-list
          :facilities="facilities"
        ></facility-list>
      </v-tab-item>
    </v-tabs> -->
  </div>
</template>

<script>
import AppTenantDetailScript from './AppTenantDetailScript'
// import ContactList from '../ContactList/ContactListVuetify'
// import FacilityList from '../FacilityList/FacilityListVuetify'


export default {
  name: "AppTenantDetail",
  mixins: [AppTenantDetailScript],
  components: {
    // ContactList,
    // FacilityList
  }
}
</script>
