<template>
  <div>
    <h1>Name: {{ license.name }}</h1>
    <hr>
    <v-textarea
      :value="txt"
      auto-grow
    ></v-textarea>
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
import LicenseDetailScript from './LicenseDetailScript'
// import ContactList from '../ContactList/ContactListVuetify'
// import FacilityList from '../FacilityList/FacilityListVuetify'


export default {
  name: "LicenseDetail",
  mixins: [LicenseDetailScript],
  components: {
    // ContactList,
    // FacilityList
  }
}
</script>
