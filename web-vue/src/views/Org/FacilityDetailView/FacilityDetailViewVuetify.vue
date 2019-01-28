<template>
  <div>
    <facility-detail-component
      :facility="facility"
    ></facility-detail-component>
  </div>
</template>

<script>
import FacilityDetailViewScript from './FacilityDetailViewScript'
import FacilityDetailComponent from '@/components/Org/FacilityDetail/FacilityDetailVuetify'


export default {
  name: "FacilityDetailView",
  mixins: [FacilityDetailViewScript],
  components: {
    FacilityDetailComponent
  }
}
</script>