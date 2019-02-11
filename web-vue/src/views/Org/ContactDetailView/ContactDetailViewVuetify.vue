<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <v-card-title class="headline">Contact</v-card-title>
      <v-layout row wrap>
        <v-flex xs4>
          <contact-detail-component
            :contact="contact"
          ></contact-detail-component>
          <v-expansion-panel>
            <v-expansion-panel-content key="location">
              <div slot="header">Location</div>
              <v-card raised>
                <location-detail :location="location"></location-detail>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import ContactDetailViewScript from './ContactDetailViewScript'
import ContactDetailComponent from '@/components/Org/ContactDetail/ContactDetailVuetify'
import LocationDetail from '@/components/Org/LocationDetail/LocationDetailVuetify'


export default {
  name: "ContactDetailView",
  mixins: [ContactDetailViewScript],
  components: {
    ContactDetailComponent,
    LocationDetail
  }
}
</script>
