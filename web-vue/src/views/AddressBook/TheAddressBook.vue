<template>
  <div>
    <h1>Address Book</h1>
    <v-tabs
      dark
      slider-color="yellow"
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
        <organization-list-view-vuetify></organization-list-view-vuetify>
      </v-tab-item>

      <v-tab
        key="contact-list"
        ripple
      >
        Contacts
      </v-tab>
      <v-tab-item
        key="contact-list"
      >
        <contact-list></contact-list>
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
        <facility-list></facility-list>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import OrganizationListViewVuetify from '../Org/OrganizationListView/OrganizationListViewVuetify'
import ContactList from '../Org/ContactListView/ContactListViewVuetify'
import FacilityList from '../Org/FacilityListView/FacilityListViewVuetify'

  export default {
    components: {
      OrganizationListViewVuetify,
      ContactList,
      FacilityList
    }
  }
</script>
