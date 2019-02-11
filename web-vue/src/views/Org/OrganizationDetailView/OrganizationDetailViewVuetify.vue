<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <v-card-title class="headline">Organization</v-card-title>
      <v-layout row wrap>
        <v-flex xs4>
          <organization-detail-component
            :organization="organization"
          ></organization-detail-component>
          <v-expansion-panel>
            <v-expansion-panel-content key="location">
              <div slot="header">Location</div>
              <v-card raised>
            <location-detail :location="location"></location-detail>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs8>
          <v-card raised>
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import OrganizationDetailViewScript from './OrganizationDetailViewScript'
import OrganizationDetailComponent from '@/components/Org/OrganizationDetail/OrganizationDetailVuetify'
import ContactList from '@/components/Org/ContactList/ContactListVuetify'
import FacilityList from '@/components/Org/FacilityList/FacilityListVuetify'
import LocationDetail from '@/components/Org/LocationDetail/LocationDetailVuetify'


export default {
  name: "OrganizationDetailView",
  mixins: [OrganizationDetailViewScript],
  components: {
    ContactList,
    FacilityList,
    LocationDetail,
    OrganizationDetailComponent
  }
}
</script>
