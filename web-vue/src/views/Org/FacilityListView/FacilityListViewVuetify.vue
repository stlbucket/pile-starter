<template>
  <div>
    <facility-list-component
      :facilities="facilities"
    ></facility-list-component>
  </div>
</template>

<script>
import FacilityListViewScript from './FacilityListViewScript'
import FacilityListComponent from '@/components/Org/FacilityList/FacilityListVuetify'

export default {
  name: "FacilityList",
  mixins: [FacilityListViewScript],
  components: {
    FacilityListComponent
  }
}
</script>
