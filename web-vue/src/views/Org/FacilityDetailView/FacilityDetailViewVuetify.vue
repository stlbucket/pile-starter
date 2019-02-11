<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <v-card-title class="headline">Facility</v-card-title>
      <v-layout row wrap>
        <v-flex xs4>
          <facility-detail-component
            :facility="facility"
          ></facility-detail-component>
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
import FacilityDetailViewScript from './FacilityDetailViewScript'
import FacilityDetailComponent from '@/components/Org/FacilityDetail/FacilityDetailVuetify'
import LocationDetail from '@/components/Org/LocationDetail/LocationDetailVuetify'


export default {
  name: "FacilityDetailView",
  mixins: [FacilityDetailViewScript],
  components: {
    FacilityDetailComponent,
    LocationDetail
  }
}
</script>
