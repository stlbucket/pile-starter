<template>
  <div>
    <h1>Name: {{ name }}</h1>
    <hr>
    <v-textarea
      :value="JSON.stringify(facility,0,2)"
      auto-grow
    ></v-textarea>
    <!-- <v-tabs
      dark
      slider-color="yellow"
    >
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
import FacilityDetailScript from './FacilityDetailScript'
import FacilityList from '../FacilityList/FacilityListVuetify'


export default {
  name: "FacilityDetail",
  mixins: [FacilityDetailScript],
  components: {
    FacilityList
  }
}
</script>
