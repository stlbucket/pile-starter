<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card>
          <h2 class="headline">Organization</h2>
          <v-text-field label="Name" :value="organization.name"></v-text-field>
          <v-text-field label="External Id" :value="organization.externalId"></v-text-field>
        </v-card>
        <location-detail :location="organization.location"></location-detail>
      </v-flex>
    </v-layout>
    <v-tabs
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
    </v-tabs>
    <v-textarea
      :value="JSON.stringify(organization,0,2)"
      auto-grow
    ></v-textarea>
  </v-container>
</template>

<script>
import OrganizationDetailScript from './OrganizationDetailScript'
import LocationDetail from '../LocationDetail/LocationDetailVuetify'
import ContactList from '../ContactList/ContactListVuetify'
import FacilityList from '../FacilityList/FacilityListVuetify'


export default {
  name: "OrganizationDetail",
  mixins: [OrganizationDetailScript],
  components: {
    ContactList,
    FacilityList,
    LocationDetail
  }
}
</script>
